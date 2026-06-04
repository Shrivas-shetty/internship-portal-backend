const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  applyInternship,
  getMyApplications,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/:internshipId", protect, applyInternship);
router.get("/myApplications", protect, getMyApplications);

module.exports = router;
