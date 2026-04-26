import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="card dashboard">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card dashboard">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const progress = Math.round(data.completionRate || 0);

  return (
    <div className="card dashboard">

      <h2>📊 Productivity Dashboard</h2>

      {/* METRICS GRID */}
      <div className="stats-grid">

        <div className="stat-box">
          <h3>{data.total}</h3>
          <p>Total Tasks</p>
        </div>

        <div className="stat-box">
          <h3>{data.completed}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-box">
          <h3>{data.pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-box">
          <h3>{progress}%</h3>
          <p>Completion</p>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="progress-text">
        You are {progress}% productive today 🚀
      </p>

    </div>
  );
}