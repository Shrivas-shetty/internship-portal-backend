import { useState } from "react";
import API from "../api";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [contact_no, setContact_no] = useState("");

  const submitHandlerReg = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/register", { name, email, password , role , contact_no});
    localStorage.setItem("token", data.token);
    alert("Registration successful");
  };

  return (
    <form onSubmit={submitHandlerReg}>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input placeholder="Role" onChange={(e) => setRole(e.target.value)} />
      <input placeholder="Contact" onChange={(e) => setContact_no(e.target.value)} />

      <button type="submit">Register</button>
    </form>
  );
}
