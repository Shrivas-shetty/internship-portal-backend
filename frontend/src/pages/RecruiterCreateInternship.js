import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function RecruiterCreateInternship() {
  // 1. Define an initial state object for easy resetting
  const initialFormState = {
    title: "",
    company: "",
    location: "",
    description: "",
    stipend: "",
    duration: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/internships", formData);
      alert("Internship created");
      
      // 2. Clear the form fields by resetting the state on success
      setFormData(initialFormState);
      
    } catch (err) {
      const message=err.response?.data?.message || "Only admins/recruiters can create internships";
      alert(message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      <div style={{ border: "1px solid #000", padding: "25px", width: "320px", textAlign: "center" }}>
        
        <h2>Create Internship</h2>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "10px" }}>
            <input 
              name="title" 
              placeholder="Title" 
              value={formData.title} // 3. Tied value to state
              onChange={changeHandler} 
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input 
              name="company" 
              placeholder="Company" 
              value={formData.company} // 3. Tied value to state
              onChange={changeHandler} 
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input 
              name="location" 
              placeholder="Location" 
              value={formData.location} // 3. Tied value to state
              onChange={changeHandler} 
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description} // 3. Tied value to state
              onChange={changeHandler}
              style={{ width: "90%", padding: "5px", height: "60px", fontFamily: "sans-serif" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              name="stipend"
              placeholder="Stipend per month"
              value={formData.stipend} // 3. Tied value to state
              onChange={changeHandler}
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input 
              name="duration" 
              placeholder="Duration" 
              value={formData.duration} // 3. Tied value to state
              onChange={changeHandler} 
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <button type="submit" style={{ width: "95%", padding: "6px", marginBottom: "10px" }}>
            Add Internship
          </button>
        </form>

        <button 
          type="button" 
          onClick={() => navigate("/recruiter/home")} 
          style={{ width: "95%", padding: "6px" }}
        >
          Back to home
        </button>

      </div>
    </div>
  );
}