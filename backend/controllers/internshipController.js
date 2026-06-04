const Internship = require("../models/Internship");


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
