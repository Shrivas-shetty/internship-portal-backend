const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Internship Portal API running");
});

module.exports = app;
