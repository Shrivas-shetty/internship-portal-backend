import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";

export default function UserEditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentProfile = location.state?.profile || {};

  const [formData, setFormData] = useState({
    name: currentProfile.name || "",
    email:currentProfile.email || "",
    contact_no: currentProfile.contact_no || "",
    resume_link: currentProfile.resume_link || "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Build a clean tracking object payload
      const payload = {
        name: formData.name,
        contact_no: formData.contact_no,
        email: formData.email,
      };

      // Only pass resume updates if user is a student
      if (currentProfile.role === "student") {
        payload.resume_link = formData.resume_link;
      }

      await API.put("/auth/profile/update", payload);
      alert("Profile updated successfully!");
      goToProfile();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile.");
    }
  };

  function goToProfile()
  {
    const role=localStorage.getItem("role");
    if(role==='student')
      navigate("/student/myProfile");
    else if(role==='recruiter')
      navigate("/recruiter/myProfile");
    else
      navigate("/admin/myProfile");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      <div style={{ border: "1px solid #000", padding: "25px", width: "320px", textAlign: "center" }}>
        
        <h2>Edit Details</h2>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", textAlign: "left", fontSize: "12px", marginBottom: "3px" }}><strong>Full Name</strong></label>
            <input name="name" value={formData.name} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} required />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", textAlign: "left", fontSize: "12px", marginBottom: "3px" }}><strong>Contact Number</strong></label>
            <input name="contact_no" value={formData.contact_no} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} required />
          </div>

          {/* Conditional Input Field: Only show for student accounts */}
          {currentProfile.role === "student" && (
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", textAlign: "left", fontSize: "12px", marginBottom: "3px" }}><strong>Resume Link</strong></label>
              <input name="resume_link" value={formData.resume_link} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} required />
            </div>
          )}

          <button type="submit" style={{ width: "95%", padding: "6px", marginBottom: "10px", cursor: "pointer" }}>
            Save Profile Changes
          </button>
        </form>

        <button type="button" onClick={goToProfile} style={{ width: "95%", padding: "6px", cursor: "pointer" }}>
          Cancel
        </button>

      </div>
    </div>
  );
}