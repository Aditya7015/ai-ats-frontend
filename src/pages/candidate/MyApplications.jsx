import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import { getMyApplications } from "../../services/applicationService";
import toast from "react-hot-toast";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    getMyApplications().then((res) => {
      setApps(res.data);
      toast.success("Applications loaded successfully");
    });
  }, []);

  const getProgress = (status) => {
    if (status === "pending") return 40;
    if (status === "accepted") return 100;
    if (status === "rejected") return 100;
    return 60;
  };

  const analytics = {
    total: apps.length,
    pending: apps.filter(a => a.status === "pending").length,
    accepted: apps.filter(a => a.status === "accepted").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  return (
    <CandidateLayout>
      <div className="max-w-7xl mx-auto px-2 md:px-0">

        {/* ================= ANALYTICS SUMMARY ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <SummaryCard label="Total Applied" value={analytics.total} />
          <SummaryCard label="Pending" value={analytics.pending} color="yellow" />
          <SummaryCard label="Accepted" value={analytics.accepted} color="green" />
          <SummaryCard label="Rejected" value={analytics.rejected} color="red" />
        </div>

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Track progress, AI insights & recruiter actions
          </p>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {apps.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <p className="text-gray-500 text-lg">
              🚀 You haven’t applied to any jobs yet
            </p>
          </div>
        )}

        {/* ================= APPLICATION CARDS ================= */}
        <div className="space-y-8">
          {apps.map((app) => {
            const progress = getProgress(app.status);
            const aiScore = Math.floor(70 + Math.random() * 25);

            return (
              <div
                key={app._id}
                className="bg-white border rounded-2xl p-6 hover:shadow-xl transition"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {app.jobId.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Application ID #{app._id.slice(-6)}
                    </p>
                  </div>

                  <StatusBadge status={app.status} />
                </div>

                {/* PROGRESS */}
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all
                        ${
                          app.status === "rejected"
                            ? "bg-red-500"
                            : app.status === "accepted"
                            ? "bg-green-500"
                            : "bg-indigo-500"
                        }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* AI INSIGHTS */}
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <InsightCard
                    title="🤖 AI Match Score"
                    value={`${aiScore}%`}
                    subtitle={
                      aiScore > 85
                        ? "Excellent fit"
                        : aiScore > 75
                        ? "Strong profile"
                        : "Needs improvement"
                    }
                  />

                  <InsightCard
                    title="📊 Recruiter View"
                    value={
                      aiScore > 85
                        ? "Top candidate"
                        : aiScore > 75
                        ? "Under consideration"
                        : "Low priority"
                    }
                  />

                  <InsightCard
                    title="📌 Next Step"
                    value={
                      app.status === "pending"
                        ? "Await recruiter review"
                        : app.status === "accepted"
                        ? "Interview expected"
                        : "Improve resume & reapply"
                    }
                  />
                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {app.status === "accepted" && (
                    <button
                      onClick={() =>
                        toast.success("📅 Interview invite sent to your email")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                    >
                      View Interview Invite
                    </button>
                  )}

                  {app.status === "rejected" && (
                    <button
                      onClick={() =>
                        toast("🤖 AI Tip: Improve skills & resume keywords")
                      }
                      className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm"
                    >
                      View AI Suggestions
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setExpanded(expanded === app._id ? null : app._id)
                    }
                    className="px-4 py-2 border rounded-full text-sm"
                  >
                    {expanded === app._id
                      ? "Hide recruiter notes"
                      : "View recruiter notes"}
                  </button>
                </div>

                {/* RECRUITER NOTES */}
                {expanded === app._id && (
                  <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                    🧑‍💼 Recruiter Notes:  
                    <p className="mt-2">
                      Candidate profile reviewed. Resume quality is good.
                      Skills match is moderate. Shortlisting depends on
                      interview availability.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </CandidateLayout>
  );
}

/* ================= COMPONENTS ================= */

const SummaryCard = ({ label, value, color = "indigo" }) => (
  <div className={`bg-${color}-50 rounded-xl p-4 text-center`}>
    <p className={`text-${color}-600 text-sm font-semibold`}>{label}</p>
    <p className={`text-${color}-700 text-2xl font-bold`}>{value}</p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-4 py-1.5 rounded-full text-sm font-semibold self-start
      ${
        status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : status === "accepted"
          ? "bg-green-100 text-green-700"
          : status === "rejected"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700"
      }`}
  >
    {status.toUpperCase()}
  </span>
);

const InsightCard = ({ title, value, subtitle }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-lg font-bold mt-1">{value}</p>
    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

export default MyApplications;
