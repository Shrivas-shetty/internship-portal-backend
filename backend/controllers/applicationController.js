const Application = require("../models/Application");
const User = require("../models/User");
const Internship=require("../models/Internship");
const Offer = require("../models/Offer");



// @desc   Apply to internship
// @route  POST /api/applications/:internshipId
// @access Student
exports.applyInternship = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "student") {
      return res.status(400).json({ message: "Only students can apply" });
    }

    //  NEW: check existing active application
    const existing = await Application.findOne({
      internship: req.params.internshipId,
      applicant: req.user._id,
      status: { $in: ["pending", "accepted"] },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already applied to this internship" });
    }

    // create new application
    const application = await Application.create({
      internship: req.params.internshipId,
      applicant: req.user._id,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Application failed" });
  }
};


// @desc   Get my applications
// @route  GET /api/applications/my
// @access Student
exports.getMyApplications = async (req, res) => {
  const applications = await Application.find({
    applicant: req.user._id,
  })
    .populate("internship", "title company location")
    .sort("-createdAt");

  res.json(applications);
};




exports.getMyApplicationsRecruiter = async (req, res) => {
  try {
    // Only recruiter allowed
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applications",
      });
    }

    //  get my internships
    const myInternships = await Internship.find({
      createdBy: req.user._id,
    }).select("_id");

    const internshipIds = myInternships.map(i => i._id);

    //  get applications for those internships
    const applications = await Application.find({
      internship: { $in: internshipIds },
    })
      .populate("applicant", "name email resume_link")
      .populate("internship", "title company location");

    res.json(applications);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyApplicationsRecruiterShortlisted = async (req, res) => {
  try {
    // Only recruiter allowed
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applications",
      });
    }

    //  get my internships
    const myInternships = await Internship.find({
      createdBy: req.user._id,
    }).select("_id");

    const internshipIds = myInternships.map(i => i._id);

    //  get applications for those internships
    const applications = await Application.find({
      internship: { $in: internshipIds },
      shortlisted: true,
      status: { $ne: "rejected" },
    })
      .populate("applicant", "name email resume_link")
      .populate("internship", "title company location");

    res.json(applications);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};





exports.acceptApplicationRecruiter = async (req, res) => {
  try {
    // 1. Double check recruiter authorization
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 2. Find and update the application status atomically
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status: "accepted" }, // Use whatever string matches your schema (e.g. "accepted" or "Accepted")
      { new: true } // Returns the updated document
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 3. Create the offer using the correct schema keys (applicant and internship)
    await Offer.create({
      applicant: application.applicant,
      internship: application.internship,
    });

    res.status(200).json({
      message: "Offer sent successfully",
      application,
    });

  } catch (error) {
    console.error("Accept Error: ", error);
    res.status(500).json({ message: "Failed to accept application" });
  }
};


exports.rejectApplicationRecruiter = async (req, res) => {
  try {
    //  Double check recruiter authorization
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Not authorized" });
    }

    //  Find and update the application status atomically
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status: "rejected" }, 
      { new: true } // Returns the updated document
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Offer rejected",
      application,
    });

  } catch (error) {
    console.error("Reject Error: ", error);
    res.status(500).json({ message: "Failed to reject application" });
  }
};



exports.ShortlistApplicationRecruiter = async (req, res) => {
  try {
    await Application.findByIdAndUpdate(
      req.params.applicationId,
      { shortlisted: true },  
      { new: true }
    );

    res.status(200).json({ message: "Application shortlisted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};



