import { useEffect, useState } from "react";
import API from "../api";

export default function Internships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    API.get("/internships").then((res) => setInternships(res.data));
  }, []);

  const applyHandler = async (id) => {
    await API.post(`/applications/${id}`);
    alert("Applied");
  };

  return (
    <div>
      {internships.map((i) => (
        <div key={i._id}>
          <h3>{i.title}</h3>
          <p>{i.company}</p>
          <button onClick={() => applyHandler(i._id)}>Apply</button>
        </div>
      ))}
    </div>
  );
}
