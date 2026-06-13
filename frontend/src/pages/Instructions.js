import React from "react";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  function goHome() {
    if (role === "student") navigate("/student/home");
    else if (role === "recruiter") navigate("/recruiter/home");
    else navigate("/admin/home");
  }

  return (
    <div style={{ padding: "40px 20px", fontFamily: "sans-serif" }}>
      
      <div style={{ maxWidth: "800px", margin: "0 auto 20px auto" }}>
        <button 
          onClick={goHome} 
          style={{ 
            padding: "8px 16px", 
            cursor: "pointer", 
            border: "1px solid #000", 
            background: "none",
            borderRadius: "4px"
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Content Container with Indentation & Spacing */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>Important Guidelines</h1>

        {/* Students */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>For Students</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "8px" }}>
              It is highly recommended to add your resume link in your profile before applying.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Applying to an internship does not guarantee selection.
            </li>
            <li style={{ marginBottom: "8px" }}>
              This platform serves as a communication medium, not a job guarantee system.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Even after being accepted, recruiters may revoke offers based on further evaluation or changing requirements.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Ensure your profile and resume information is accurate and up to date.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Maintain professional communication with recruiters at all times.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Avoid applying to roles that do not match your skills or interests.
            </li>
          </ul>
        </section>

        {/* Recruiters */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>For Recruiters</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "8px" }}>
              Avoid sending multiple offers to students for the same internship simultaneously.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Recommended: Send an offer to one student and wait for a response (maximum 2 days). If no response, you may proceed with another candidate.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Provide clear and accurate internship descriptions and expectations.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Communicate decisions (accept/reject) in a timely and professional manner.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Avoid misleading or incomplete job postings.
            </li>
          </ul>
        </section>

        {/* Admin */}
        <section style={{ marginBottom: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>For Admins</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
            <li style={{ marginBottom: "8px" }}>Monitor internships and maintain platform integrity.</li>
            <li style={{ marginBottom: "8px" }}>Make valuable insights from analytics and suggest improvements.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Instructions;