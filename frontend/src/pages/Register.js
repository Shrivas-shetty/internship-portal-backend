import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Set a sensible default value matching the first dropdown option
  const [contact_no, setContact_no] = useState("");
  const [resume_link, setResume_link] = useState("");

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    // Clear resume link if switching away from student
    if (selectedRole !== "student") {
      setResume_link("");
    }
  };

  const submitHandlerReg = async (e) => {
    e.preventDefault();
    try {
      // Create the registration payload dynamically
      const payload = { name, email, password, role, contact_no };
      
      // If the user is a student and provided a link, attach it to the request
      if (role === "student" && resume_link.trim() !== "") {
        payload.resume_link = resume_link;
      }

      const { data } = await API.post("/auth/register", payload);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      alert("Registration successful");

      if (data.role === 'student')
        navigate("/student/home");
      else if (data.role === 'recruiter')
        navigate("/recruiter/home");
      else
        navigate("/admin/home");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Registration failed. Please check your inputs.";
      alert(message);
    }
  };

  return (
    /* Outer container to force center alignment on the entire screen */
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      
      {/* Plain, unstyled box wrapping your register elements */}
      <div style={{ border: "1px solid #000", padding: "25px", width: "300px", textAlign: "center" }}>
        
        <h2>Create Account</h2>

        <form onSubmit={submitHandlerReg}>
          <div style={{ marginBottom: "10px" }}>
            <input 
              placeholder="Name" 
              onChange={(e) => setName(e.target.value)} 
              style={{ width: "90%", padding: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input 
              type="email"
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ width: "90%", padding: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input 
              type="password"
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: "90%", padding: "5px" }}
              required
            />
          </div>

          {/* Plain Dropdown Selection for Role */}
          <div style={{ marginBottom: "10px" }}>
            <select 
              value={role} 
              onChange={handleRoleChange}
              style={{ width: "95%", padding: "5px" }}
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input 
              placeholder="Contact" 
              onChange={(e) => setContact_no(e.target.value)} 
              style={{ width: "90%", padding: "5px" }}
              required
            />
          </div>

          {/* Conditionally rendered OPTIONAL resume input for students */}
          {role === "student" && (
            <div style={{ marginBottom: "15px" }}>
              <input 
                placeholder="Resume Link (Reccomended)" 
                value={resume_link}
                onChange={(e) => setResume_link(e.target.value)} 
                style={{ width: "90%", padding: "5px" }}
              />
            </div>
          )}

          <button type="submit" style={{ width: "95%", padding: "6px", marginBottom: "10px" }}>
            Register
          </button>
        </form>

        <button onClick={() => navigate("/")} style={{ width: "95%", padding: "6px" }}>
          Back
        </button>

      </div>
    </div>
  );
}