import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function RecruiterApplicationsShortlisted() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/applications/myApplicationsRecruiter/shortlisted")
      .then((res) => {
         //  Safeguarded against non-array payloads using Array.isArray check 
        setApplications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        alert("Please login again");
        setLoading(false);
      });
  }, []);

  function handleAccept(id) {
    API.post(`/applications/accept/${id}`)
      .then(() => {
        alert("Application accepted & Offer sent");
        // Optional: Update status locally in state if needed
        setApplications((prev) =>
          prev?.map((app) => (app._id === id ? { ...app, status: "accepted" } : app))
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send offer.");
      });
  }

  function handleReject(id) {
    API.post(`/applications/reject/${id}`)
      .then(() => {
        alert("Application rejected");
        // Optional: Update status locally in state if needed
        setApplications((prev) =>
          prev?.map((app) => (app._id === id ? { ...app, status: "rejected" } : app))
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to reject");
      });
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

  return (
    /* Outer container centering the content list down the middle of the screen */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>Shortlisted applications for my uploaded Internships</h2>
        <button onClick={() => navigate("/recruiter/applicationsHome")} style={{ padding: "6px 12px" }}>
          Back
        </button>
      </div>

      {/* Added optional chaining to prevent reading length of unexpected types */}
      {applications?.length === 0 && <p>No applications yet</p>}

      {/*  Added optional chaining to prevent mapping errors */}
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
          <h3 style={{ margin: "0 0 5px 0" }}>{app.internship?.title}</h3>
          <p style={{ margin: "0 0 5px 0" }}><strong>Company : </strong> {app.internship?.company}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Location : </strong> {app.internship?.location}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Applicant : </strong> {app.applicant?.name}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Resume Link : </strong> {app.applicant?.resume_link}</p> 

          <p style={{ margin: "0 0 5px 0" }}>
            {/*  defensive optional chaining to app.applicant?.resume_link to stop rendering crashes */}
            <a href={app.applicant?.resume_link} target="_blank" rel="noreferrer" style={{ color: "#000" }}>View Resume</a>
          </p> 

          <p style={{ margin: "0 0 5px 0" }}><strong>Email : </strong> {app.applicant?.email}</p> 
          <p style={{ margin: "0 0 15px 0" }}><strong>Shortlisted : </strong>{app.shortlisted ? "true" : "false"}</p>          
          <p style={{ margin: "0 0 15px 0" }}><strong>Status : </strong>{app.status}</p>          
          <p style={{ margin: "0 0 15px 0" }}>
            <strong>Applied Date: </strong>
           {new Date(app.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
           })}
          </p>

          {app.status === "pending" && (
            <div style={{ display: "flex", gap: "40px" }}>
              {app.status?.toLowerCase() !== "accepted" && (
                <button onClick={() => handleAccept(app._id)} style={{ padding: "6px 12px" }}>
                  Accept and send offer ✅
                </button>
              )}

              <pre></pre>
              {app.status?.toLowerCase() !== "accepted" && (
                <button onClick={() => handleReject(app._id)} style={{ padding: "6px 12px" }}>
                  Reject ❌
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}