const adminOrRecruiterOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  }
  else if(req.user && req.user.role === "recruiter")
    next();
  else 
    res.status(403).json({ message: "Admin or Recruiter access only" });
};



module.exports = adminOrRecruiterOnly;
