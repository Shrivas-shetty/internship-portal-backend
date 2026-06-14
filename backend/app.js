const express = require("express");

const app = express();
const cors = require("cors");


app.use(cors({
  origin: ["https://internship-portal-backend-three.vercel.app"],
  credentials: true
}));

// Middleware
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));

app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/saves", require("./routes/saveRoutes"));

app.use("/api/offers", require("./routes/offerRoutes.js"));


app.use("/api/admin", require("./routes/adminRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Internship Portal API running");
});

module.exports = app;
