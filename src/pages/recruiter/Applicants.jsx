import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterLayout from "../../components/RecruiterLayout";
import {
  getApplicants,
  getAnalysis,
  updateStatus,
} from "../../services/applicationService";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  applied: "bg-blue-100 text-blue-700",
  shortlisted: "bg-green-100 text-green-700",
  interview: "bg-purple-100 text-purple-700",
  rejected: "bg-red-100 text-red-700",
};

function Applicants() {
  const { jobId } = useParams();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [aiData, setAiData] = useState({});
  const [aiLoadingId, setAiLoadingId] = useState(null);

  /* ================= LOAD APPLICANTS ================= */
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await getApplicants(jobId);
        setApps(res.data || []);
      } catch {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  /* ================= AI SCORE (PER CARD) ================= */
  const loadAiScore = async (appId) => {
    try {
      setAiLoadingId(appId);
      const res = await getAnalysis(appId);
      setAiData((prev) => ({
        ...prev,
        [appId]: res.data,
      }));
    } catch {
      toast.error("Failed to fetch AI score");
    } finally {
      setAiLoadingId(null);
    }
  };

  /* ================= STATUS UPDATE ================= */
  const changeStatus = async (id, status) => {
    try {
      await updateStatus(id, status);
      setApps((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <RecruiterLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Applicants
        </h1>
        <p className="text-gray-500">
          Review candidates with AI-powered insights
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border animate-pulse"
            >
              <div className="h-4 bg-gray-200 w-1/2 rounded mb-3" />
              <div className="h-3 bg-gray-200 w-1/3 rounded mb-6" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : apps.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center">
          <h2 className="text-xl font-semibold">
            No applicants yet
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((a) => {
            const score = aiData[a._id]?.matchScore;

            return (
              <div
                key={a._id}
                className="bg-white rounded-2xl border p-6 shadow hover:shadow-xl transition hover:-translate-y-1"
              >
                {/* TOP */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                    {a.candidateId?.name?.[0]?.toUpperCase() ||
                      "C"}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">
                      {a.candidateId?.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {a.candidateId?.email}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[a.status]}`}
                  >
                    {a.status.toUpperCase()}
                  </span>
                </div>

                {/* AI SCORE */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    AI Match Score
                  </p>

                  {aiLoadingId === a._id ? (
                    <p className="text-sm text-gray-400">
                      Analyzing...
                    </p>
                  ) : score != null ? (
                    <p
                      className={`text-xl font-bold ${
                        score >= 70
                          ? "text-green-600"
                          : score >= 40
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {score}%
                    </p>
                  ) : (
                    <button
                      onClick={() => loadAiScore(a._id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      🤖 View AI Score
                    </button>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setSelected(a)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    View Full Profile
                  </button>

                  <select
                    value={a.status}
                    onChange={(e) =>
                      changeStatus(a._id, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">
                      Shortlisted
                    </option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL (unchanged, still works) */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-8 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">
              {selected.candidateId?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selected.candidateId?.email}
            </p>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}

export default Applicants;
