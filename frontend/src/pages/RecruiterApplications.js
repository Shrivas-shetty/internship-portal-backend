import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function RecruiterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/applications/myApplicationsRecruiter")
      .then((res) => {
        setApplications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        alert("Please login again");
        setLoading(false);
      });
  }, []);

  function handleShortlist(id) {
    API.post(`/applications/shortlist/${id}`)
      .then(() => {
        alert("Application shortlisted");

        // FIX: update shortlisted (NOT status)
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, shortlisted: true } : app
          )
        );
      })
      .catch((err) => {
        console.error(err);
        const message =
          err.response?.data?.message || "Failed to shortlist.";
        alert(message);
      });
  }

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading...
      </p>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>
          Applications for my uploaded Internships
        </h2>
        <button
          onClick={() => navigate("/recruiter/applicationsHome")}
          style={{ padding: "6px 12px" }}
        >
          Back
        </button>
      </div>

      {applications?.length === 0 && <p>No applications yet</p>}

      {applications?.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid #000",
            padding: "20px",
            width: "450px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>
            {app.internship?.title}
          </h3>
          <p><strong>Company : </strong> {app.internship?.company}</p>
          <p><strong>Location : </strong> {app.internship?.location}</p>
          <p><strong>Applicant : </strong> {app.applicant?.name}</p>

          <p><strong>Resume Link : </strong> {app.applicant?.resume_link}</p>

          <p>
            <a
              href={app.applicant?.resume_link}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000" }}
            >
              View Resume
            </a>
          </p>

          <p><strong>Email : </strong> {app.applicant?.email}</p>

          {app.status === "pending" && 
          <p>
            <strong>Shortlisted : </strong>{" "}
            {app.shortlisted ? "true" : "false"}
          </p>}

          <p>
            <strong>Status : </strong>{" "}
            {app.status || "pending"}
          </p>

          {app.status === "pending" && (
            <div style={{ display: "flex", gap: "40px" }}>
              
              {/*  FIX: boolean check (NOT string) */}
              {!app.shortlisted && (
                <button
                  onClick={() => handleShortlist(app._id)}
                  style={{ padding: "6px 12px" }}
                >
                  Shortlist
                </button>
              )}

            </div>
          )}
        </div>
      ))}
    </div>
  );
}