import { useNavigate } from "react-router-dom";

function Entrance() {
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
            onClick={() => navigate("/login")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Login
          </button>
        </div>

        <div>
          <button 
            onClick={() => navigate("/register")} 
            style={{ width: "95%", padding: "8px" }}
          >
            Register
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Entrance;