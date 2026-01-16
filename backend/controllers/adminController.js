const Internship = require("../models/Internship");
const Application = require("../models/Application");
const User = require("../models/User");

// @desc   Admin dashboard stats
// @route  GET /api/admin/stats
// @access Admin
exports.getAdminStats = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalInternships = await Internship.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Applications per internship (aggregation)
    const applicationsPerInternship = await Application.aggregate([
      {
        $group: {
          _id: "$internship",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "internships",
          localField: "_id",
          foreignField: "_id",
          as: "internship",
        },
      },
      {
        $unwind: "$internship",
      },
      {
        $project: {
          _id: 0,
          internshipTitle: "$internship.title",
          applications: "$count",
        },
      },
    ]);

    res.json({
      totalUsers,
      totalInternships,
      totalApplications,
      applicationsPerInternship,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};
