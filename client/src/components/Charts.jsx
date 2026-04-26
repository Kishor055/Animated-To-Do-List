import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#f97316", "#3b82f6", "#ef4444"];

export default function Charts({
  completed = 40,
  pending = 20,
  high = 10,
  low = 15
}) {
  // Pie chart data
  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  // Bar chart data
  const barData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "High Priority", value: high },
    { name: "Low Priority", value: low }
  ];

  return (
    <div className="card chart-card">

      <h2>📊 Productivity Analytics</h2>

      {/* PIE CHART */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="value" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}