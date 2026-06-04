
import { useEffect, useState } from "react";
import API from "../api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/applications/myApplications")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Please login again");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Applications</h2>

      {applications.length === 0 && <p>No applications yet</p>}

      {applications.map((app) => (
        <div key={app._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <h3>{app.internship.title}</h3>
          <p>{app.internship.company}</p>
          <p>Location: {app.internship.location}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
}
