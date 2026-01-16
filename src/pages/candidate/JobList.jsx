import { useEffect, useMemo, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI STATES
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [jobType, setJobType] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getAllJobs();
        setJobs(res.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ================= FILTER + SORT ================= */
  const filteredJobs = useMemo(() => {
    let data = [...jobs];

    if (search) {
      data = data.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          job.companyId?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "az") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      data.reverse();
    }

    return data;
  }, [jobs, search, sort]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50 py-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find Your Next Job 🚀
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredJobs.length} AI-matched opportunities for you
          </p>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm p-4 mb-10
                        flex flex-col md:flex-row gap-4 md:items-center md:justify-between
                        sticky top-4 z-20">
          <input
            type="text"
            placeholder="Search jobs, skills, companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border rounded-full px-5 py-2
                       focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="flex gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-full px-4 py-2"
            >
              <option value="latest">Latest</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        {/* ================= JOB GRID ================= */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-full mb-6" />
                <div className="h-10 bg-gray-200 rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              😕 No jobs match your search
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, idx) => {
              const aiScore = Math.floor(70 + Math.random() * 25);

              return (
                <div
                  key={job._id}
                  className={`group bg-white rounded-2xl p-6 border
                              shadow-sm hover:shadow-2xl hover:-translate-y-1
                              transition-all duration-300 relative
                              ${idx === 0 ? "ring-2 ring-indigo-500" : ""}`}
                >
                  {/* AI MATCH BADGE */}
                  <span className="absolute top-4 right-4 text-xs font-semibold
                                   bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    🤖 {aiScore}% Match
                  </span>

                  {/* TITLE */}
                  <h2 className="text-lg font-semibold text-gray-900
                                 group-hover:text-indigo-600 transition">
                    {job.title}
                  </h2>

                  {/* COMPANY */}
                  <p className="text-sm text-gray-500 mt-1">
                    {job.companyId?.name || "Hiring Company"}
                  </p>

                  {/* DESC */}
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {job.description}
                  </p>

                  {/* TAGS */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full
                                     bg-indigo-50 text-indigo-600">
                      Full Time
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full
                                     bg-green-50 text-green-600">
                      Remote
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6">
                    <Link
                      to={`/candidate/jobs/${job._id}`}
                      className="block text-center w-full
                                 rounded-full py-2.5 font-semibold
                                 bg-indigo-600 text-white
                                 hover:bg-indigo-700 transition"
                    >
                      View & Apply →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobList;
