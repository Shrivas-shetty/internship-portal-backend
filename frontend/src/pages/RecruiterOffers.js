import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function RecruiterOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/offers/recruiter") // Adjust this endpoint URL to match your backend route
      .then((res) => {
        /* CHANGED: Safeguarded against non-array payloads using Array.isArray check */
        setOffers(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        alert("Please login again");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading sent offers...</p>;

  return (
    /* Outer container centering the content list down the middle of the screen */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>Offers Sent to Applicants</h2>
        <button onClick={() => navigate("/recruiter/home")} style={{ padding: "6px 12px" }}>
          Back to home
        </button>
      </div>

      {/* CHANGED: Added optional chaining to prevent reading length of unexpected types */}
      {offers?.length === 0 && <p>No offers sent yet</p>}

      {/* CHANGED: Added optional chaining to safeguard loop mapping */}
      {offers?.map((offer) => (
        <div 
          key={offer._id} 
          style={{ 
            border: "1px solid #000", 
            padding: "20px", 
            width: "450px", 
            marginBottom: "15px", 
            textAlign: "left" 
          }}
        >
          {/* CHANGED: Added optional chaining to internship object calls to protect against missing records */}
          <h3 style={{ margin: "0 0 5px 0" }}>{offer.internship?.title}</h3>
          <p style={{ margin: "0 0 5px 0" }}><strong>Company:</strong> {offer.internship?.company}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Location:</strong> {offer.internship?.location}</p>
          <p style={{ margin: "0 0 5px 0" }}><strong>Sent To:</strong> {offer.applicant?.name} ({offer.applicant?.email})</p>
          <p style={{ margin: "0", color: "#555" }}><strong>Status:</strong> {offer.status || "Pending"}</p>
        </div>
      ))}
    </div>
  );
}