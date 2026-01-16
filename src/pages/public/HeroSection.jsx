import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeroSection() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-40 text-slate-900">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-24 left-1/4 -z-10 h-80 w-80 bg-indigo-300 blur-[120px] opacity-30"></div>

      {/* AVATARS + STARS */}
      <div className="flex items-center mt-24">
        <div className="flex -space-x-3 pr-3">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" className="size-8 rounded-full border-2 border-white" />
          <img src="https://randomuser.me/api/portraits/men/75.jpg" className="size-8 rounded-full border-2 border-white" />
        </div>

        <div>
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <svg key={i} className="size-4 fill-indigo-600 text-indigo-600" viewBox="0 0 24 24">
                <path d="M12 2l3 6 6 .9-4.5 4.3L17.8 21 12 17.8 6.2 21l1.3-7.8L3 8.9 9 8z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-slate-600">Trusted by 10,000+ users</p>
        </div>
      </div>

      {/* HEADLINE */}
      <h1 className="text-4xl md:text-6xl font-semibold text-center max-w-5xl mt-6 leading-tight">
        AI-Powered{" "}
        <span className="bg-linear-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
          Job & Internship
        </span>{" "}
        Platform
      </h1>

      {/* SUBTEXT */}
      <p className="max-w-md text-center text-slate-600 text-base mt-6">
        Smart resume matching. Faster hiring. Better career opportunities.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex gap-4 mt-8">

        {!token && (
          <>
            <Link
              to="/candidate/jobs"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 flex items-center transition"
            >
              Find Jobs
            </Link>

            <Link
              to="/register"
              className="border border-slate-300 hover:bg-slate-100 rounded-full px-8 h-12 flex items-center transition"
            >
              Employer Sign Up
            </Link>
          </>
        )}

        {token && role === "candidate" && (
          <Link
            to="/candidate/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 flex items-center transition"
          >
            Go to Dashboard
          </Link>
        )}

        {token && role === "recruiter" && (
          <Link
            to="/recruiter/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 flex items-center transition"
          >
            Post a Job
          </Link>
        )}
      </div>
        
    </section>
  );
}

export default HeroSection;
