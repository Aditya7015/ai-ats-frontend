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

    // Search
    if (search) {
      data = data.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          job.companyId?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Job type (UI only)
    if (jobType !== "all") {
      data = data.filter(() => true);
    }

    // Sort
    if (sort === "az") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      data.reverse(); // latest
    }

    return data;
  }, [jobs, search, sort, jobType]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Next Job
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredJobs.length} opportunities available
          </p>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between sticky top-4 z-10">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* FILTERS */}
          <div className="flex gap-3 flex-wrap">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Jobs</option>
              <option value="fulltime">Full Time</option>
              <option value="internship">Internship</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="latest">Latest</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>

        {/* ================= JOB GRID ================= */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-full mb-6" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              No jobs match your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white border rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* TITLE */}
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
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
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                    Full Time
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600">
                    Remote
                  </span>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-gray-400">
                    Posted recently
                  </span>

                  <Link
                    to={`/candidate/jobs/${job._id}`}
                    className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
                  >
                    Apply
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobList;
