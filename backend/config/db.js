const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      dbName:process.env.DB_NAME
    });
    console.log("MongoDB connected to database (internship_portal) succesfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


