import { useEffect, useState } from "react";
import RecruiterLayout from "../../components/RecruiterLayout";
import { getRecruiterAnalytics } from "../../services/analyticsService";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#facc15", "#f97316", "#ef4444"];

function RecruiterDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getRecruiterAnalytics().then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <RecruiterLayout>
        <div className="animate-pulse text-gray-500">Loading analytics...</div>
      </RecruiterLayout>
    );
  }

  const pipelineData = stats.statusStats.map((s) => ({
    name: s._id,
    value: s.count,
  }));

  const kpiCards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Total Applications",
      value: stats.totalApplications,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "Active Pipeline",
      value: pipelineData.reduce((a, b) => a + b.value, 0),
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <RecruiterLayout>
      <h1 className="text-3xl font-bold mb-6">Recruiter Analytics Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 text-white shadow-xl bg-linear-to-br ${kpi.color}`}
          >
            <p className="text-sm opacity-80">{kpi.title}</p>
            <h2 className="text-4xl font-bold mt-2">{kpi.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* PIPELINE PIE */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Hiring Pipeline Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pipelineData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
              >
                {pipelineData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* APPLICATION FLOW */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Application Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={pipelineData}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#colorApps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow lg:col-span-2">
          <h3 className="font-semibold mb-4">Pipeline Stage Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {pipelineData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default RecruiterDashboard;
