const express = require("express");
const protect = require("../middleware/authMiddleware");
const recruiterOnly = require("../middleware/recruiterMiddleware");


const {
  createInternship,
  getInternships,
} = require("../controllers/internshipController");


const router = express.Router();

router.get("/", protect, getInternships);
router.post("/", protect, recruiterOnly, createInternship);

module.exports = router;
