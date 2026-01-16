import { Link } from "react-router-dom";

function RecruiterCTA() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-blue-700 to-indigo-800 py-20">
      
      {/* Soft background glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* TEXT */}
        <div className="text-center md:text-left max-w-2xl">
          <p className="text-sm uppercase tracking-wide text-blue-200 mb-2">
            For Recruiters
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Hire Faster with AI-Powered Shortlisting
          </h2>

          <p className="text-blue-100 mt-4 text-lg">
            Post jobs, get AI-ranked candidates, and reduce hiring time by up to
            70%.
          </p>
        </div>

        {/* CTA */}
        <div>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Post a Job for Free →
          </Link>

          <p className="text-xs text-blue-200 mt-3 text-center md:text-left">
            No credit card required
          </p>
        </div>

      </div>
    </section>
  );
}

export default RecruiterCTA;
