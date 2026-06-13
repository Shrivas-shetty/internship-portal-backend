import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function StudentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/applications/myApplications")
      .then((res) => {
        /* CHANGED: Safeguarded against non-array payloads using Array.isArray check */
        setApplications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        alert("Please login again");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

  return (
    /* Outer container centering the content list down the middle of the screen */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>My Applications</h2>
        <button onClick={() => navigate("/student/home")} style={{ padding: "6px 12px" }}>
          Back to home
        </button>
      </div>

      {/* CHANGED: Added optional chaining to prevent reading length of unexpected types */}
      {applications?.length === 0 && <p>No applications yet</p>}

      {/* CHANGED: Added optional chaining to safeguard loop mapping */}
      {applications?.map((app) => (
        <div 
          key={app._id} 
          style={{ 
            border: "1px solid #000", 
            padding: "20px", 
            width: "450px", 
            marginBottom: "15px", 
            textAlign: "left" 
          }}
        >
          {/* CHANGED: Ensured structural optional chaining across all properties of the internship object */}
          <h3 style={{ margin: "0 0 5px 0" }}>{app.internship?.title}</h3>
          <p style={{ margin: "0 0 5px 0" }}><strong>Company:</strong> {app.internship?.company}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Location:</strong> {app.internship?.location}</p>
          <p style={{ margin: "0", color: "#555" }}><strong>Status:</strong> {app.status || "Pending"}</p>
        </div>
      ))}
    </div>
  );
}