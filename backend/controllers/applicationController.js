const Application = require("../models/Application");

// @desc   Apply to internship
// @route  POST /api/applications/:internshipId
// @access Student
exports.applyInternship = async (req, res) => {
  try {
    const application = await Application.create({
      internship: req.params.internshipId,
      applicant: req.user._id,
    });

    res.status(201).json(application);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Already applied to this internship" });
    }
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
