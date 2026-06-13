import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  
  function handleLogout() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role"); 
    navigate("/");
  }

  return (
    /* Outer container to force center alignment on the entire screen */
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      
      {/* Plain, unstyled box wrapping your admin navigation menu */}
      <div style={{ border: "1px solid #000", padding: "25px", width: "300px", textAlign: "center" }}>
        
        <h1 style={{ fontSize: "24px", margin: "0 0 5px 0" }}>Internship Portal</h1>
        <h2 style={{ fontSize: "18px", margin: "0 0 20px 0", color: "#555" }}>Admin Dashboard</h2>
        
        <div style={{ marginBottom: "10px" }}>
          <button 
            onClick={() => navigate("/admin/internships")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Internships
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button 
            onClick={() => navigate("/admin/addInternship")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Add Internship
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button 
            onClick={() => navigate("/admin/Analytics")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Analytics
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button 
            onClick={() => navigate("/admin/myProfile")} 
            style={{ width: "95%", padding: "8px" }}
          >
            My Profile
          </button>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button 
            onClick={() => navigate("/admin/guidelines")} 
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

export default AdminHome;