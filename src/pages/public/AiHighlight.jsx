function AiHighlight() {
  return (
    <section className="py-20 bg-linear-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">
            AI-Powered Hiring
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Smart AI Resume Matching
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Our AI uses NLP and skill intelligence to match candidates with
            the most relevant jobs — faster, fairer, and smarter.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon="📄"
            title="Resume Parsing"
            desc="Automatically extracts skills, experience, and keywords from resumes using NLP."
          />

          <Feature
            icon="🧠"
            title="Skill Matching"
            desc="Matches candidates with jobs based on role fit, skills, and experience level."
          />

          <Feature
            icon="📊"
            title="Score-based Shortlisting"
            desc="Candidates are ranked using AI scores so recruiters shortlist faster."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* ICON */}
      <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-indigo-50 text-2xl mb-4">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        {title}
      </h3>

      {/* DESC */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default AiHighlight;
