const Internship = require("../models/Internship");
const Application=require("../models/Application");
const Offer=require("../models/Offer");
const Saved=require("../models/Saved");

exports.createInternship = async (req, res) => {
  const internship = await Internship.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json(internship);
};


exports.getInternships = async (req, res) => {
  const filters = {};

  if (req.query.location) {
    filters.location = req.query.location;
  }

  const internships = await Internship.find(filters).populate(     //explain this very line
    "createdBy",
    "name email"
  );

  res.json(internships);
};


exports.getRecruiterInternships = async(req,res) => {
  const internships= await Internship.find({
    createdBy:req.user._id,
  });

  res.json(internships);
}


exports.deleteInternship = async (req, res) => {
  try {
    //  Role Check (Authorization Guard)
    if (req.user.role !== 'admin' && req.user.role !== 'recruiter') {
      return res.status(403).json({ // Changed status to 403 (Forbidden) instead of 400 (Bad Request)
        message: "Only admin or recruiters can delete Internships",
      });
    }

    const id = req.params.internshipId;

    //  Fetch the existing internship
    const internship = await Internship.findOne({ _id: id });

    if (!internship) {
      return res.status(404).json({
        message: "This internship doesn't exist",
      });
    }

    //  Ownership Validation
    const isCreator = internship.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCreator && !isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to delete this internship",
      });
    }

    //  CASCADE delete Implementation
    // remove everything pointing to this internship ID
    await Application.deleteMany({ internship: id });
    await Saved.deleteMany({ internship: id });
    await Offer.deleteMany({ internship: id });
    
    //  Delete the main Internship document
    await Internship.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Internship deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting internship:", error); // Added console logging for server debugging
    return res.status(500).json({
      message: "Failed to delete internship due to an internal server error",
    });
  }
};





exports.updateInternship = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Only admin or recruiters can update Internships" });
    }

    const id = req.params.internshipId;
    const internship = await Internship.findOne({ _id: id });

    if (!internship) {
      return res.status(404).json({ message: "This internship doesn't exist" });
    }

    // Security check: Only allow the creator or an admin to edit it
    const isCreator = internship.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: "You are not authorized to update this internship" });
    }

    // Update the record with the new text fields
    const updatedInternship = await Internship.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedInternship);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update internship" });
  }
};
