import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBack = () => {
    if (role === "student") navigate("/student/home");
    else if (role === "recruiter") navigate("/recruiter/home");
    else navigate("/admin/home");
  };

  if (!profile) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading profile...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      <div style={{ border: "1px solid #000", padding: "25px", width: "350px", textAlign: "left" }}>
        
        <h2 style={{ textAlign: "center", margin: "0 0 20px 0" }}>My Profile</h2>

        <p style={{ margin: "0 0 10px 0" }}><strong>Name:</strong> {profile.name}</p>
        <p style={{ margin: "0 0 10px 0" }}><strong>Email:</strong> {profile.email}</p>
        <p style={{ margin: "0 0 10px 0" }}><strong>Account Type:</strong> {profile.role}</p>
        <p style={{ margin: "0 0 15px 0" }}><strong>Contact Number:</strong> {profile.contact_no || "Not Provided"}</p>

        {/* Role-Specific Field: Only Students show a Resume Link */}
        {profile.role === "student" && (
          <p style={{ margin: "0 0 20px 0" }}>
            <strong>Resume Link:</strong>{" "}
            {profile.resume_link ? (
              <a href={profile.resume_link} target="_blank" rel="noreferrer" style={{ color: "#000" }}>View Resume</a>
            ) : (
              "None Provided"
            )}
          </p>
        )}

        <button 
          onClick={() => navigate("edit", { state: { profile } })} 
          style={{ width: "100%", padding: "6px", marginBottom: "10px", cursor: "pointer" }}
        >
          Edit Profile
        </button>

        <button 
          onClick={handleBack} 
          style={{ width: "100%", padding: "6px", cursor: "pointer" }}
        >
          Back to Home
        </button>

      </div>
    </div>
  );
}