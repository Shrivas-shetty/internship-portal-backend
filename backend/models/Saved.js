const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate saving of internships
savedSchema.index(
  { internship: 1, applicant: 1 },
  { unique: true }
);

module.exports = mongoose.model("Saved", savedSchema);
