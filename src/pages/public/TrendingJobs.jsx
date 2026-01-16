import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function TrendingJobs() {
  const [jobs, setJobs] = useState([]);
  const [tilt, setTilt] = useState({});

  useEffect(() => {
    getAllJobs().then((res) => setJobs(res.data.slice(0, 8)));
  }, []);

  const threshold = 6;

  const handleMove = (id, e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setTilt({
      ...tilt,
      [id]: { x: y * -threshold, y: x * threshold },
    });
  };

  return (
    <section className="bg-linear-to-b from-blue-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <h2 className="text-3xl font-bold text-gray-900">
          What are you looking for today?
        </h2>
        <p className="text-xl font-semibold mt-2 mb-6">
          Fresher Jobs
        </p>

        {/* FILTER PILLS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[
            "Big brands",
            "Work from home",
            "Part-time",
            "MBA",
            "Engineering",
            "Design",
            "Data Science",
          ].map((tag, i) => (
            <span
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition
                ${
                  i === 0
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-700 hover:bg-blue-50"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* JOB CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl border shadow-sm p-5 h-full transition-all duration-200 hover:shadow-md"
              onMouseMove={(e) => handleMove(job._id, e)}
              onMouseLeave={() =>
                setTilt({ ...tilt, [job._id]: { x: 0, y: 0 } })
              }
              style={{
                transform: `perspective(1000px) rotateX(${
                  tilt[job._id]?.x || 0
                }deg) rotateY(${tilt[job._id]?.y || 0}deg)`,
              }}
            >
              {/* BADGE */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  📈 Actively hiring
                </span>
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-gray-900 leading-snug min-h-12">
                {job.title}
              </h3>

              {/* COMPANY */}
              <p className="text-sm text-gray-500 mt-1">
                {job.companyId?.name || "Confidential Company"}
              </p>

              {/* DETAILS */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {job.location && (
                  <p className="flex items-center gap-2">
                    <span>📍</span>
                    {job.location}
                  </p>
                )}
                {job.salary && (
                  <p className="flex items-center gap-2">
                    <span>💰</span>
                    {job.salary}
                  </p>
                )}
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Job
                </span>
                <Link
                  to={`/job/${job._id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingJobs;
