import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get("/internships")
      .then((res) => setInternships(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  const applyHandler = async (id) => {
    try {
      await API.post(`/applications/${id}`);
      alert("Applied");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to apply";
      alert(message);
    }
  };

  const saveHandler = async (id) => {
    try {
      await API.post(`/saves/${id}`);
      alert("Saved");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Failed to save.";
      alert(message);
    }
  };

  const handleBackNavigation = () => {
    if (role === "student") navigate("/student/home");
    else if (role === "recruiter") navigate("/recruiter/home");
    else navigate("/admin/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: "0 0 10px 0" }}>All Internships</h1>
        <button onClick={handleBackNavigation} style={{ padding: "6px 12px" }}>
          Back to home
        </button>
      </div>

      {/* No data */}
      {internships?.length === 0 && <p>No internships available.</p>}

      {/* Internship Cards */}
      {internships?.map((i) => (
        <div
          key={i._id}
          style={{
            border: "1px solid #000",
            padding: "20px",
            width: "100%",
            maxWidth: "450px",
            marginBottom: "15px",
            textAlign: "left",
            boxSizing: "border-box",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>{i.title}</h3>

          <p style={{ margin: "0 0 5px 0" }}>
            <strong>Company:</strong> {i.company}
          </p>

          <p style={{ margin: "0 0 5px 0" }}>
            <strong>Location:</strong> {i.location}
          </p>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "14px",
              color: "#333",
            }}
          >
            {i.description}
          </p>

          <p style={{ margin: "0 0 5px 0" }}>
            <strong>Stipend (/month):</strong> {i.stipend}
          </p>

          <p style={{ margin: "0 0 15px 0" }}>
            <strong>Duration:</strong> {i.duration}
          </p>

          {role === "student" && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => applyHandler(i._id)}
                style={{ padding: "6px 12px", cursor: "pointer" }}
              >
                Apply
              </button>

              <button
                onClick={() => saveHandler(i._id)}
                style={{ padding: "6px 12px", cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}