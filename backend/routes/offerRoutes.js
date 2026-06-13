const express = require("express");
const protect = require("../middleware/authMiddleware");
const studentOnly = require("../middleware/studentMiddleware");
const recruiterOnly = require("../middleware/recruiterMiddleware");


const {
  getMyOffers,
  getMyOffersRecruiter,
  acceptOffer,
  rejectOffer,
} = require("../controllers/offerController.js");


const router = express.Router();

router.get("/", protect, studentOnly, getMyOffers);
router.post("/accept/:offerId", protect, studentOnly, acceptOffer);
router.post("/reject/:offerId", protect, studentOnly, rejectOffer);


router.get("/recruiter", protect , recruiterOnly, getMyOffersRecruiter);



module.exports = router;

