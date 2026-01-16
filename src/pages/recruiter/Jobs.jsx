import { useEffect, useMemo, useState } from "react";
import RecruiterLayout from "../../components/RecruiterLayout";
import { getRecruiterJobs } from "../../services/jobService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getRecruiterJobs();
        setJobs(
          (res.data || []).map((job) => ({
            ...job,
            status: "active", // UI-only
            applicants: Math.floor(Math.random() * 50), // UI-only
          }))
        );
      } catch (err) {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [jobs, search, statusFilter]);

  /* ================= ACTIONS (UI ONLY) ================= */
  const toggleStatus = (id) => {
    setJobs((prev) =>
      prev.map((j) =>
        j._id === id
          ? {
              ...j,
              status: j.status === "active" ? "paused" : "active",
            }
          : j
      )
    );
    toast.success("Job status updated");
  };

  const closeJob = (id) => {
    setJobs((prev) =>
      prev.map((j) =>
        j._id === id ? { ...j, status: "closed" } : j
      )
    );
    toast("Job closed", { icon: "🔒" });
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j._id !== id));
    toast.error("Job deleted (UI only)");
  };

  return (
    <RecruiterLayout>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Jobs
          </h1>
          <p className="text-gray-500">
            Manage postings, applicants & performance
          </p>
        </div>

        <Link
          to="/recruiter/jobs/create"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition hover:scale-105"
        >
          + Create Job
        </Link>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full md:w-48"
        >
          <option value="all">All jobs</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="h-8 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center shadow">
          <h2 className="text-xl font-semibold mb-2">
            No jobs found
          </h2>
          <p className="text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-2xl p-6 shadow hover:shadow-xl transition hover:-translate-y-1"
            >
              {/* TITLE */}
              <h2 className="text-lg font-bold text-gray-800">
                {job.title}
              </h2>

              {/* STATUS */}
              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                  job.status === "active"
                    ? "bg-green-100 text-green-600"
                    : job.status === "paused"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {job.status.toUpperCase()}
              </span>

              {/* ANALYTICS */}
              <div className="flex gap-3 mt-4 text-sm">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {job.applicants} Applicants
                </span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                  Job ID: {job._id.slice(-5)}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to={`/recruiter/jobs/${job._id}/applicants`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Applicants →
                </Link>

                {job.status !== "closed" && (
                  <>
                    <button
                      onClick={() => toggleStatus(job._id)}
                      className="text-sm text-yellow-600 hover:underline"
                    >
                      {job.status === "active"
                        ? "Pause"
                        : "Resume"}
                    </button>

                    <button
                      onClick={() => closeJob(job._id)}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Close
                    </button>
                  </>
                )}

                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </RecruiterLayout>
  );
}

export default Jobs;
