import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function StudentSaves() {
  const [saves, setSaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/saves/mySaves")
      .then((res) => {
        /* CHANGED: Safeguarded against non-array payloads using Array.isArray check */
        setSaves(Array.isArray(res.data) ? res.data : []);
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
        <h2 style={{ margin: "0 0 10px 0" }}>My Saves</h2>
        <button onClick={() => navigate("/student/home")} style={{ padding: "6px 12px" }}>
          Back to home
        </button>
      </div>

      {/* CHANGED: Added optional chaining to safely read array size */}
      {saves?.length === 0 && <p>No internships saved yet</p>}

      {/* CHANGED: Added optional chaining to safeguard loop mapping */}
      {saves?.map((s) => (
        <div 
          key={s._id} 
          style={{ 
            border: "1px solid #000", 
            padding: "20px", 
            width: "450px", 
            marginBottom: "15px", 
            textAlign: "left" 
          }}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>{s.internship?.title}</h3>
          {/* CHANGED: Added structural optional chaining across all sibling fields of the nested internship object */}
          <p style={{ margin: "0 0 5px 0" }}><strong>Company:</strong> {s.internship?.company}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Location:</strong> {s.internship?.location}</p>
          <p style={{ margin: "0", color: "#555" }}><strong>Status:</strong> {s.status || "Saved"}</p>
        </div>
      ))}
    </div>
  );
}