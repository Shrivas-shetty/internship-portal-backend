const Internship = require("../models/Internship");

// @desc   Create internship (Admin)
// @route  POST /api/internships
// @access Admin
exports.createInternship = async (req, res) => {
  const internship = await Internship.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json(internship);
};

// @desc   Get all internships (Public)
// @route  GET /api/internships
// @access Public
exports.getInternships = async (req, res) => {
  const filters = {};

  if (req.query.location) {
    filters.location = req.query.location;
  }

  const internships = await Internship.find(filters).populate(
    "createdBy",
    "name email"
  );

  res.json(internships);
};
