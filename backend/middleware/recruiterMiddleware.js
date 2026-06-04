const recruiterOnly = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    res.status(403).json({ message: "recruiter access only" });
  }
};

module.exports = recruiterOnly;
