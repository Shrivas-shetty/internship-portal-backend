const Saved = require("../models/Saved");
const User = require("../models/User");
const Internship=require("../models/Internship");

exports.saveInternship=async (req,res) => {
    try {
        
        if(req.user.role!=="student")
        {
            console.log("Only students can save");
            return res.status(400).json({
                message:"Only students can save internships"
            });
        }
        
        const saved=await Saved.create({
            internship:req.params.internshipId,
            applicant:req.user._id,
        });

        
        res.status(201).json(saved);
    } catch (error) {
        if (error.code === 11000) {
            return res
             .status(400)
             .json({ message: "Already applied to this internship" });
             console.log("Error : Already applied");
        }
    return res.status(500).json({ message: "Application failed" });
    }

}



exports.getMySaved = async (req, res) => {
  const saves = await Saved.find({
    applicant: req.user._id,
  })
    .populate("internship", "title company location")
    .sort("-createdAt");

  res.status(200).json(saves);
};

