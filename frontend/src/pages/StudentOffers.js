import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function StudentOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/offers")
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

  function handleAccept(offerId) {
    API.post(`/offers/accept/${offerId}`)
      .then((res) => {
        alert("Offer accepted successfully!");
        
        setOffers((prevOffers) =>
          /* CHANGED: Added defensive optional chaining to map updates */
          prevOffers?.map((o) =>
            o._id === offerId
              ? { ...o, status: "Accepted", recruiterContact: res.data?.recruiterContact }
              : o
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to accept offer.");
      });
  }

  function handleReject(offerId) {
    if (!window.confirm("Are you sure you want to reject this offer?")) return;

    API.post(`/offers/reject/${offerId}`)
      .then(() => {
        alert("Offer rejected.");
        
        setOffers((prevOffers) =>
          /* CHANGED: Added defensive optional chaining to map updates */
          prevOffers?.map((o) =>
            o._id === offerId
              ? { ...o, status: "Rejected" }
              : o
          )
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to reject offer.");
      });
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

  return (
    /* Outer container centering the content list down the middle of the screen */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "90vh", padding: "20px" }}>
      
      {/* Centered Heading and Button section */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 10px 0" }}>My Offers</h2>
        <button onClick={() => navigate("/student/home")} style={{ padding: "6px 12px" }}>
          Back to home
        </button>
      </div>

      {/* CHANGED: Added optional chaining to safely read array size */}
      {offers?.length === 0 && <p>No offers yet</p>}

      {/* CHANGED: Added optional chaining to prevent mapping errors */}
      {offers?.map((offer) => {
        const status = offer.status?.toLowerCase() || "pending";

        return (
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
            <h3 style={{ margin: "0 0 5px 0" }}>{offer.internship_id?.title || offer.internship?.title}</h3>
            <p style={{ margin: "0 0 5px 0" }}>{offer.internship_id?.company || offer.internship?.company}</p>
            
            {/* CHANGED: Added critical optional chaining properties here to avoid rendering crashes on unpopulated relations */}
            <p style={{ margin: "0 0 5px 0" }}>Location: {offer.internship_id?.location || offer.internship?.location}</p>
            <p style={{ margin: "0 0 10px 0" }}>Status: {offer.status || "Pending"}</p>
            
            {/* 1. IF ACCEPTED: Show recruiter details permanently */}
            {status === "accepted" && (
              <div style={{ border: "1px solid green", marginTop: "10px", padding: "10px", backgroundColor: "#f9fff9" }}>
                <p style={{ margin: "0 0 5px 0" }}><strong>🎉 Offer Confirmed! Contact your recruiter:</strong></p>
                <p style={{ margin: "0 0 3px 0" }}>Name: {offer.recruiterContact?.name || "N/A"}</p>
                <p style={{ margin: "0 0 3px 0" }}>Email: {offer.recruiterContact?.email || "N/A"}</p>
                <p style={{ margin: "0" }}>Contact: {offer.recruiterContact?.contact_no || "N/A"}</p>
              </div>
            )}

            {/* 2. IF REJECTED: Show a clean rejection placeholder text */}
            {status === "rejected" && (
              <p style={{ color: "red", marginTop: "10px", fontStyle: "italic", margin: "0" }}>
                You have declined this offer.
              </p>
            )}

            {/* 3. IF PENDING ONLY: Keep the action buttons visible */}
            {status === "pending" && (
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button onClick={() => handleAccept(offer._id)} style={{ padding: "5px 10px" }}>Accept</button>
                <button onClick={() => handleReject(offer._id)} style={{ padding: "5px 10px" }}>Reject</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}