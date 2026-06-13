const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password, role , contact_no ,resume_link} = req.body;

  
  if (!name || !email || !password || !contact_no || !role) 
   {
     return res.status(400).json({message: "Please provide all required fields",});
   }

   if (role=='student' && !resume_link ) 
   {
     return res.status(400).json({message: "Please provide resume link (Required for applicants) Enter NA if not available currently",});
   }
  
   if (password.length < 6) 
  {
    return res.status(400).json({
    message: "Password must be at least 6 characters long",});
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password ,role, contact_no , resume_link});

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    contact_no: user.contact_no,
    role:user.role,
    resume_link:user.resume_link,
    token: generateToken(user._id),
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user)
  {
    return res.status(401).json({ message: "Email not registered" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};



// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    // req.user._id is populated by your token verification middleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error fetching profile data" });
  }
};



// PUT /api/auth/profile/update
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      contact_no: req.body.contact_no
    };

    // Prevent random role escalation attacks or email tampering issues manually
    if (req.user.role === "student" && req.body.resume_link) {
      fieldsToUpdate.resume_link = req.body.resume_link;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile information" });
  }
};