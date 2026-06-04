const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password, role , contact_no } = req.body;

  
  if (!name || !email || !password || !contact_no ) 
   {
     return res.status(400).json({message: "Please provide all required fields",});
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

  const user = await User.create({ name, email, password ,role, contact_no});

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    contact_no: user.contact_no,
    role:user.role,
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
    token: generateToken(user._id),
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
