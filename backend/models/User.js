const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "admin","recruiter"],
      default: "student",
    },
    contact_no: {
      type: String,
      default: "NA",
    },
    resume_link: {
      type: String,
      default: "NA",
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (this.isModified("password"))
      this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
