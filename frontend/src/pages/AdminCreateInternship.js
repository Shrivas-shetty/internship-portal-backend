import { useState } from "react";
import API from "../api";

export default function AdminCreateInternship() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    stipend: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/internships", formData);
      alert("Internship created");
    } catch (err) {
      alert("Only admin can create internships");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Create Internship (Admin)</h2>

      <input name="title" placeholder="Title" onChange={changeHandler} />
      <input name="company" placeholder="Company" onChange={changeHandler} />
      <input name="location" placeholder="Location" onChange={changeHandler} />
      <input
        name="stipend"
        placeholder="Stipend"
        onChange={changeHandler}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={changeHandler}
      />

      <button type="submit">Create</button>
    </form>
  );
}
