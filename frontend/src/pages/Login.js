import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful");
      if (data.role === 'student')
        navigate("/student/home");
      else if (data.role === 'recruiter')
        navigate("/recruiter/home");
      else
        navigate("/admin/home");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Login failed. Please check your credentials."; //displays this rhs message
      alert(message);
    }
  };

  return (
    /* Outer container to force center alignment on the entire screen */
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      
      {/* Box wrapping the login layout */}
      <div style={{ border: "1px solid #000", padding: "25px", width: "300px", textAlign: "center" }}>
        
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "10px" }}>
            <input 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "90%", padding: "5px" }}
            />
          </div>

          <button type="submit" style={{ width: "95%", padding: "6px", marginBottom: "10px" }}>
            Login
          </button>
        </form>

        <button onClick={() => navigate("/")} style={{ width: "95%", padding: "6px" }}>
          Back
        </button>
        
      </div>
    </div>
  );
}