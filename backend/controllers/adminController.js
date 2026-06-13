// controllers/adminController.js

const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

exports.getAdminStats = async (req, res) => {
  try {
    // 1. BASIC COUNTS
    const totalUsers = await User.countDocuments();
    const totalInternships = await Internship.countDocuments();
    const totalApplications = await Application.countDocuments();

    // 2. ROLE STATS
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // 3. APPLICATION STATUS
    const applicationStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // 4. TOP INTERNSHIPS 
    const applicationsPerInternship = await Application.aggregate([
      {
        $group: {
          _id: "$internship",
          applications: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "internships", 
          localField: "_id",
          foreignField: "_id",
          as: "internshipDetails",
        },
      },
      {
        $unwind: {
          path: "$internshipDetails",
          preserveNullAndEmptyArrays: true, // prevents data loss
        },
      },
      {
        $project: {
          _id: 0,
          internshipTitle: {
            $ifNull: ["$internshipDetails.title", "Unknown Internship"],
          },
          applications: 1,
        },
      },
      { $sort: { applications: -1 } },
      { $limit: 5 },
    ]);

    // 5. TOP RECRUITERS
    const topRecruiters = await Internship.aggregate([
      {
        $group: {
          _id: "$createdBy",
          internshipsPosted: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $project: {
          _id: 0,
          name: "$recruiter.name",
          internshipsPosted: 1,
        },
      },
      { $sort: { internshipsPosted: -1 } },
      { $limit: 5 },
    ]);

    // 6. RECENT USERS
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");

    // 7. RECENT INTERNSHIPS
    const recentInternships = await Internship.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title");

    // FINAL RESPONSE
    res.json({
      totalUsers,
      totalInternships,
      totalApplications,
      roleStats,
      applicationStatus,
      applicationsPerInternship,
      topRecruiters,
      recentUsers,
      recentInternships,
    });
  } catch (error) {
    console.error("ADMIN STATS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};