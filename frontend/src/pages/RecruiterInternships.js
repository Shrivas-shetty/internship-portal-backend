import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function RecruiterInternships() {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/internships/recruiter")
      /* CHANGED: Safeguarded against non-array payloads using Array.isArray check */
      .then((res) => setInternships(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  async function handleDelete(id) { 
    try {
      await API.post(`/internships/delete/${id}`);
      alert("Internship removed successfully");
      
      setInternships((prevInternships) =>
        prevInternships.filter((internship) => internship._id !== id)
      );
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Could not delete internship";
      alert(message);
    }
  }

  async function handleUpdate(id) { 
     const internshipToUpdate = internships?.find((i) => i._id === id);
     if (internshipToUpdate)
        navigate(`/recruiter/update-internship/${id}`, { state: { internshipToUpdate } });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: "0 0 10px 0" }}>My uploaded Internships</h1>
        <button onClick={() => navigate("/recruiter/home")} style={{ padding: "6px 12px", cursor: "pointer" }}>
          Back to home
        </button>
      </div>

      {/* CHANGED: Added optional chaining to prevent reading length of unexpected types */}
      {internships?.length === 0 && <p>You haven't uploaded any internships yet.</p>}

      {/* CHANGED: Added optional chaining to safeguard loop mapping */}
      {internships?.map((i) => (
        <div 
          key={i._id} 
          style={{ 
            border: "1px solid #000", 
            padding: "20px", 
            width: "450px", 
            marginBottom: "15px", 
            textAlign: "left" 
          }}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>{i.title}</h3>
          <p style={{ margin: "0 0 5px 0" }}><strong>Company:</strong> {i.company}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Location:</strong> {i.location}</p>
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#333" }}>{i.description}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Stipend:</strong> {i.stipend}</p>
          <p style={{ margin: "0 0 15px 0" }}><strong>Duration:</strong> {i.duration}</p>
          
          <button style={{ padding: "6px 12px", marginRight: "10px", cursor: "pointer" }} onClick={()=>handleUpdate(i._id)}> Update Internship </button>
          <button style={{ padding: "6px 12px", cursor: "pointer" }} onClick={()=>handleDelete(i._id)}> Delete Internship </button>

        </div>
      ))}
    </div>
  );
}