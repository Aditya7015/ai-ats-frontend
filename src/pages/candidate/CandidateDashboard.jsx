import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import { getMyApplications } from "../../services/applicationService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

function CandidateDashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApps(res.data));
  }, []);

  // ===== ORIGINAL LOGIC (UNCHANGED) =====
  const total = apps.length;
  const shortlisted = apps.filter(a => a.status === "shortlisted").length;
  const interviews = apps.filter(a => a.status === "interview").length;
  const rejected = apps.filter(a => a.status === "rejected").length;
  const applied = total - shortlisted - interviews - rejected;

  // ===== DERIVED DATA (ADDED) =====
  const pieData = [
    { name: "Applied", value: applied },
    { name: "Shortlisted", value: shortlisted },
    { name: "Interview", value: interviews },
    { name: "Rejected", value: rejected },
  ];

  const stackedData = [
    {
      name: "Applications",
      applied,
      shortlisted,
      interviews,
      rejected,
    },
  ];

  const trendData = apps.map((_, i) => ({
    name: `Day ${i + 1}`,
    applied: i + 1,
  }));

  const interviewRate = total
    ? Math.round((interviews / total) * 100)
    : 0;

  const radialData = [
    { name: "Conversion", value: interviewRate, fill: "#16a34a" },
  ];

  return (
    <CandidateLayout>
      <h1 className="text-3xl font-bold mb-8">Candidate Analytics Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Total Applications" value={total} />
        <KpiCard title="Shortlisted" value={shortlisted} color="green" />
        <KpiCard title="Interviews" value={interviews} color="yellow" />
        <KpiCard title="Rejected" value={rejected} color="red" />
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* DONUT */}
        <ChartCard title="Application Status Breakdown">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                paddingAngle={5}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* RADIAL GAUGE */}
        <ChartCard title="Interview Conversion Rate">
          <ResponsiveContainer width="100%" height={320}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={radialData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={10} />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-center mt-4 text-xl font-semibold">
            {interviewRate}% Conversion
          </p>
        </ChartCard>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* STACKED BAR */}
        <ChartCard title="Status Comparison">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stackedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applied" stackId="a" fill="#2563eb" />
              <Bar dataKey="shortlisted" stackId="a" fill="#16a34a" />
              <Bar dataKey="interviews" stackId="a" fill="#f59e0b" />
              <Bar dataKey="rejected" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* AREA CHART */}
        <ChartCard title="Application Growth Trend">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="applied"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorApp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </CandidateLayout>
  );
}

/* ================= UI COMPONENTS ================= */

function KpiCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-400 to-yellow-500",
    red: "from-red-500 to-red-600",
  };

  return (
    <div className={`bg-linear-to-r ${colors[color]} text-white p-6 rounded-xl shadow-lg`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default CandidateDashboard;
