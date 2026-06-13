

const Application = require("../models/Application");
const User = require("../models/User");
const Internship=require("../models/Internship");
const Offer = require("../models/Offer");



exports.getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      applicant: req.user._id, 
    })
      .populate("internship", "title company location createdBy")
      .sort("-createdAt");

    // Manually attach recruiter contact info to accepted offers before sending to frontend
    const updatedOffers = await Promise.all(
      offers.map(async (offer) => {
        // Convert mongoose document to plain JavaScript object so we can modify it
        const offerObj = offer.toObject();

        if (offerObj.status === "accepted" && offerObj.internship?.createdBy) {
          const recruiter = await User.findById(offerObj.internship.createdBy).select("name email");
          if (recruiter) {
            offerObj.recruiterContact = {
              name: recruiter.name,
              email: recruiter.email,
            };
          }
        }
        return offerObj;
      })
    );

    res.json(updatedOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching offers" });
  }
};


exports.getMyOffersRecruiter = async (req, res) => {
  try {
    // 1. Safety check: ensure the user is a recruiter
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can view these offers" });
    }

    // 2. Get all internship IDs created by this recruiter
    const myInternships = await Internship.find({ createdBy: req.user._id }).select("_id");
    const internshipIds = myInternships.map((i) => i._id);

    // 3. Find all offers linked to those internship IDs
    const offers = await Offer.find({
      internship: { $in: internshipIds },
    })
      .populate("applicant", "name email") // Populates student details
      .populate("internship", "title company location") // Populates internship details
      .sort("-createdAt");

    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching recruiter offers" });
  }
};




exports.acceptOffer = async (req, res) => {
  try {
    // 1. Find the offer and verify it belongs to the logged-in student
    const offer = await Offer.findById(req.params.offerId);


    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Adapt the schema key ('applicant' or 'applicant_id') to match your schema setup
    const studentId = offer.applicant || offer.applicant_id;
    const internshipId = offer.internship || offer.internship_id;

    

    if (studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to accept this offer" });
    }

    // 2. Mark the offer as accepted
    offer.status = "accepted";
    await offer.save();

    // 3. Remove the corresponding application from the database
    await Application.findOneAndDelete({
      applicant: studentId,
      internship: internshipId,
    });

    // 4. Trace back to find the Recruiter's user details
    const internship = await Internship.findById(internshipId);
    let recruiterContact = { name: "Not Available", email: "Not Available" , contact_no:"Not Available" };


    if (internship && internship.createdBy) {
      const recruiter = await User.findById(internship.createdBy).select("name email contact_no");


      if (recruiter) {
        recruiterContact = {
          name: recruiter.name,
          email: recruiter.email,
          contact_no: recruiter.contact_no,
        };
      }
    }

    // 5. Respond with success and contact info for the frontend
    res.status(200).json({
      message: "Offer accepted successfully",
      recruiterContact,
    });

  } catch (error) {
    console.error("Accept Offer Error:", error);
    res.status(500).json({ message: "Server error processing acceptance" });
  }
};

// @desc    Reject an internship offer, clear application, notify status
// @route   POST /api/offers/reject/:offerId
// @access  Student
exports.rejectOffer = async (req, res) => {
  try {
    // 1. Find the offer and verify authorization
    const offer = await Offer.findById(req.params.offerId);
    
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const studentId = offer.applicant || offer.applicant_id;
    const internshipId = offer.internship || offer.internship_id;

    if (studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to reject this offer" });
    }

    // 2. Update offer status to Rejected
    offer.status = "rejected";
    await offer.save();

    // 3. Remove the application from the database so the student record clears out
    await Application.findOneAndDelete({
      applicant: studentId,
      internship: internshipId,
    });

    res.status(200).json({ message: "Offer rejected successfully" });

  } catch (error) {
    console.error("Reject Offer Error:", error);
    res.status(500).json({ message: "Server error processing rejection" });
  }
};