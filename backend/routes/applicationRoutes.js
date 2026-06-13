const express = require("express");

const protect = require("../middleware/authMiddleware");
const studentOnly = require("../middleware/studentMiddleware");
const recruiterOnly = require("../middleware/recruiterMiddleware");


const {
  applyInternship,
  getMyApplications,
  getMyApplicationsRecruiter,
  getMyApplicationsRecruiterShortlisted,
  acceptApplicationRecruiter,
  rejectApplicationRecruiter,
  ShortlistApplicationRecruiter,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/:internshipId", protect, studentOnly,applyInternship);
router.get("/myApplications", protect, studentOnly, getMyApplications);
router.get("/myApplicationsRecruiter", protect, recruiterOnly, getMyApplicationsRecruiter);
router.get("/myApplicationsRecruiter/shortlisted", protect, recruiterOnly, getMyApplicationsRecruiterShortlisted);
router.post("/accept/:applicationId", protect, recruiterOnly, acceptApplicationRecruiter);
router.post("/reject/:applicationId", protect, recruiterOnly, rejectApplicationRecruiter);
router.post("/shortlist/:applicationId", protect, recruiterOnly, ShortlistApplicationRecruiter);


module.exports = router;
