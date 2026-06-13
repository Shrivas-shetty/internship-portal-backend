import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminAnalytics() {           //check line 76 top recruiters returns []
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        console.log("STATS:", res.data); // keep for debugging
        setStats(res.data);
      } catch (err) {
        console.error(err);
        const message= err.response?.data?.message || "Failed to load admin statistics.";
        alert(message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!stats)
    return <p style={{ textAlign: "center" }}>No data available</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ border: "1px solid black", padding: "20px", width: "500px" }}>

        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

        <button onClick={() => navigate("/admin/home")}>
          Back
        </button>

        <hr />

        <p><b>Total Users:</b> {stats.totalUsers}</p>
        <p><b>Total Internships:</b> {stats.totalInternships}</p>
        <p><b>Total Applications:</b> {stats.totalApplications}</p>

        <hr />

        <h3>User Roles</h3>
        <ul>
          {/*  ?. prevents crash  */}
          {stats.roleStats?.map((r, i) => (
            <li key={i}>{r._id}: {r.count}</li>
          ))}
        </ul>

        <h3>Application Status</h3>
        <ul>
          {/*  here also ?. chaining */}
          {stats.applicationStatus?.map((s, i) => (
            <li key={i}>{s._id}: {s.count}</li>
          ))}
        </ul>

        <hr />

        <h3>Top Internships</h3>
        <ol>
          {/* ?. to prevent crash if applicationsPerInternship is missing */}
          {stats.applicationsPerInternship?.map((i, idx) => (
            <li key={idx}>
              {i.internshipTitle} ({i.applications})
            </li>
          ))}
        </ol>

        <h3>Top Recruiters</h3>             
        <ol>
          {stats.topRecruiters?.map((r, idx) => (
            <li key={idx}>
              {r.name} ({r.internshipsPosted})
            </li>
          ))}
        </ol>

        <hr />

        <h3>Recent Users</h3>
        <ul>
          {stats.recentUsers?.map((u) => (
            <li key={u._id}>{u.name} - {u.email}</li>
          ))}
        </ul>

        <h3>Recent Internships</h3>
        <ul>
          {stats.recentInternships?.map((i) => (
            <li key={i._id}>{i.title}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}