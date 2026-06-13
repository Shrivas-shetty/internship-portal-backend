const express = require("express");

const protect = require("../middleware/authMiddleware");
const studentOnly = require("../middleware/studentMiddleware");


const {
  saveInternship,
  getMySaved,
} = require("../controllers/savedController");

const router = express.Router();

router.post("/:internshipId", protect, studentOnly,saveInternship);
router.get("/mySaves", protect, studentOnly, getMySaved);


module.exports = router;
