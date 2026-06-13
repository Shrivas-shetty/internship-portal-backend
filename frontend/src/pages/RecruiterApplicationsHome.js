import { useNavigate } from "react-router-dom";

function RecruiterApplicationsHome() {
  const navigate = useNavigate();

  return (
    /* Outer container to force center alignment on the entire screen */
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "90vh" 
    }}>
      
      {/* Box wrapping the layout */}
      <div style={{ 
        border: "1px solid #000", 
        padding: "25px", 
        width: "300px", 
        textAlign: "center" 
      }}>
        
        <h1>Internship Portal</h1>
        
        <div style={{ marginBottom: "10px" }}>
          <button 
            onClick={() => navigate("/recruiter/myApplications")} 
            style={{ width: "95%", padding: "8px" }}
          >
            All Applications
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button 
            onClick={() => navigate("/recruiter/myApplications/shortlisted")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Shorlisted Applications
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button 
            onClick={() => navigate("/recruiter/home")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Back to home
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default RecruiterApplicationsHome;