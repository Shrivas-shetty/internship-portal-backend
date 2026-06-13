import { useNavigate } from "react-router-dom";

function StudentHome() {
  const navigate = useNavigate();
  
  function handleLogout() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role"); 
    navigate("/");
  }

  const handleInternshipClick = () => {
    navigate("/student/internships");
  };

  const handleApplicationClick = () => {
    navigate("/student/myApplications");
  };

  const handleSavedClick = () => {
    navigate("/student/mySaved");
  };

  const handleOfferClick = () => {
    navigate("/student/myOffers");
  };

  return (
    /* Outer container to force center alignment on the entire screen */
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      
      {/* Plain, unstyled box wrapping your student navigation menu */}
      <div style={{ border: "1px solid #000", padding: "25px", width: "300px", textAlign: "center" }}>
        
        <h1 style={{ fontSize: "24px", margin: "0 0 5px 0" }}>Internship Portal</h1>
        <h2 style={{ fontSize: "18px", margin: "0 0 20px 0", color: "#555" }}>Student Dashboard</h2>
        
        <div style={{ marginBottom: "10px" }}>
          <button onClick={handleInternshipClick} style={{ width: "95%", padding: "8px" }}>
            View Internships
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button onClick={handleApplicationClick} style={{ width: "95%", padding: "8px" }}>
            My Applications
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button onClick={handleSavedClick} style={{ width: "95%", padding: "8px" }}>
            My Saved Internships
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button onClick={handleOfferClick} style={{ width: "95%", padding: "8px" }}>
            My Offers
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button 
            onClick={() => navigate("/student/myProfile")} 
            style={{ width: "95%", padding: "8px" }}
          >
            My Profile
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button 
            onClick={() => navigate("/student/guidelines")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Guidelines
          </button>
        </div>

        <hr style={{ margin: "15px 0" }} />

        <div>
          <button 
            onClick={handleLogout} 
            style={{ width: "95%", padding: "8px", backgroundColor: "#fff", border: "1px solid red", color: "red", cursor: "pointer" }}
          >
            Logout
          </button>
        </div>

        
        
      </div>
    </div>
  );
}

export default StudentHome;

