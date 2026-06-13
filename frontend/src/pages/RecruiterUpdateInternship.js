import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function RecruiterUpdateInternship() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Grabs the ID from the URL bar just in case

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    stipend: "",
    duration: "",
  });

  // Automatically fill out the inputs with the internship's current data on page load
  useEffect(() => {
    const editData = location.state?.internshipToUpdate;
    if (editData) {
      setFormData({
        title: editData.title || "",
        company: editData.company || "",
        location: editData.location || "",
        description: editData.description || "",
        stipend: editData.stipend || "",
        duration: editData.duration || "",
      });
    }
  }, [location.state]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Sends a PUT request to update this specific internship
      await API.put(`/internships/update/${id}`, formData);
      alert("Internship updated successfully!");
      goToInternships();
    } catch (err) {
      const message = err.response?.data?.message || "Only admins/recruiters can update internships";
      alert(message);
    }
  };

  function goToInternships()
  {
    const role=localStorage.getItem("role");
    if(role==='admin')
        navigate("/admin/internships");
    else if(role==='recruiter')
        navigate("/recruiter/myInternships");
    else{
        navigate("/");
        alert("Permission denied. Login again please");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      <div style={{ border: "1px solid #000", padding: "25px", width: "320px", textAlign: "center" }}>
        
        <h2>Update Internship</h2>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "10px" }}>
            <input name="title" placeholder="Title" value={formData.title} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input name="company" placeholder="Company" value={formData.company} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input name="location" placeholder="Location" value={formData.location} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <textarea name="description" placeholder="Description" value={formData.description} onChange={changeHandler} style={{ width: "90%", padding: "5px", height: "60px", fontFamily: "sans-serif" }} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input name="stipend" placeholder="Stipend" value={formData.stipend} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input name="duration" placeholder="Duration" value={formData.duration} onChange={changeHandler} style={{ width: "90%", padding: "5px" }} />
          </div>

          <button type="submit" style={{ width: "95%", padding: "6px", marginBottom: "10px" }}>
            Save Changes
          </button>
        </form>

        <button type="button" onClick={goToInternships} style={{ width: "95%", padding: "6px" }}>
          Cancel
        </button>

      </div>
    </div>
  );
}