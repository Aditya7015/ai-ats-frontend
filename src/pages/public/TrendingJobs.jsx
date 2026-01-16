import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

function TrendingJobs() {
  const [jobs, setJobs] = useState([]);
  const [tilt, setTilt] = useState({});
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    getAllJobs().then((res) => setJobs(res.data.slice(0, 8)));
  }, []);

  const threshold = 8;

  const handleMove = (id, e) => {
    if (isMobile) return;

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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-14 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            🔥 Trending Jobs
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-xl">
            AI-recommended roles hiring actively right now
          </p>
        </div>

        {/* ================= CATEGORY PILLS ================= */}
        <div className="flex flex-wrap gap-3 mb-14 animate-fade-up delay-100">
          {[
            "🔥 Trending",
            "🏠 Work from home",
            "🎓 Fresher",
            "💻 Engineering",
            "📊 Data Science",
            "🎨 Design",
          ].map((tag, i) => (
            <span
              key={i}
              className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer
                transition-all duration-300 hover:-translate-y-0.5
                ${
                  i === 0
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white border text-gray-700 hover:bg-indigo-50"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ================= JOB GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job, idx) => {
            const aiScore = Math.floor(75 + Math.random() * 20);

            return (
              <div
                key={job._id}
                onMouseMove={(e) => handleMove(job._id, e)}
                onMouseLeave={() =>
                  setTilt({ ...tilt, [job._id]: { x: 0, y: 0 } })
                }
                style={{
                  transform: `perspective(1200px)
                    rotateX(${tilt[job._id]?.x || 0}deg)
                    rotateY(${tilt[job._id]?.y || 0}deg)`,
                }}
                className={`relative group bg-white rounded-2xl p-6 border
                            shadow-md hover:shadow-2xl
                            hover:-translate-y-2 transition-all duration-300
                            animate-fade-up`}
              >
                {/* HOVER GLOW */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r
                                from-indigo-400 to-purple-400 opacity-0
                                group-hover:opacity-10 transition pointer-events-none" />

                {/* AI MATCH */}
                <span className="absolute top-4 right-4 text-xs font-bold
                                 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                  🤖 {aiScore}% Match
                </span>

                {/* TRENDING */}
                {idx < 2 && (
                  <span className="absolute top-4 left-4 text-xs font-bold
                                   bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    🔥 Trending
                  </span>
                )}

                {/* CONTENT */}
                <h3 className="text-lg font-semibold text-gray-900 mt-10
                               group-hover:text-indigo-600 transition">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {job.companyId?.name || "Confidential Company"}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  {job.location && <p>📍 {job.location}</p>}
                  {job.salary && <p>💰 {job.salary}</p>}
                </div>

                {/* CTA */}
                <Link
                  to={`/candidate/jobs/${job._id}`}
                  className="block mt-6 text-center w-full
                             rounded-full py-2.5 font-semibold
                             bg-indigo-600 text-white
                             hover:bg-indigo-700 transition"
                >
                  View & Apply →
                </Link>
              </div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-20 flex justify-center animate-fade-up delay-200">
          <Link
            to="/candidate/jobs"
            className="px-10 py-4 rounded-full text-lg font-bold
                       bg-indigo-600 text-white shadow-xl
                       hover:bg-indigo-700 hover:scale-105 transition"
          >
            Explore all jobs →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default TrendingJobs;
