const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  createInternship,
  getInternships,
} = require("../controllers/internshipController");

const router = express.Router();

router.get("/", getInternships);
router.post("/", protect, adminOnly, createInternship);

module.exports = router;
