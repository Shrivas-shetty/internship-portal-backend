const express = require("express");

const app = express();

// Middleware
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Internship Portal API running");
});

module.exports = app;
