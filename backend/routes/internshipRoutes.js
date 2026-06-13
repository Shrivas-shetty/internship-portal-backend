const express = require("express");
const protect = require("../middleware/authMiddleware");
const recruiterOnly = require("../middleware/recruiterMiddleware");
const adminOrRecruiterOnly = require("../middleware/adminOrRecruiterMiddleware");


const {
  createInternship,
  getInternships,
  getRecruiterInternships,
  deleteInternship,
  updateInternship,
} = require("../controllers/internshipController");


const router = express.Router();

router.get("/", protect, getInternships);
router.post("/", protect, adminOrRecruiterOnly, createInternship);
router.get("/recruiter", protect, recruiterOnly, getRecruiterInternships);
router.post("/delete/:internshipId", protect, adminOrRecruiterOnly, deleteInternship);
router.put("/update/:internshipId", protect, adminOrRecruiterOnly , updateInternship);


module.exports = router;
