import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function ApplyJob() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);

  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);

  const [applied, setApplied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  /* ================= LOAD JOB ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const jobRes = await api.get(`/jobs/${jobId}`);
        setJob(jobRes.data);

        const allJobs = await api.get("/jobs");
        setSimilarJobs(allJobs.data.filter(j => j._id !== jobId).slice(0, 3));

        if (localStorage.getItem(`applied_${jobId}`)) setApplied(true);
        if (localStorage.getItem(`bookmark_${jobId}`)) setBookmarked(true);
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [jobId]);

  /* ================= APPLY ================= */
  const submitApplication = async () => {
    if (!resume) return toast.error("Please upload your resume first");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", resume);

      await api.post(`/applications/apply/${jobId}`, formData);

      localStorage.setItem(`applied_${jobId}`, "true");
      setApplied(true);
      toast.success("🎉 Application submitted successfully!");
    } catch {
      toast.error("Application failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = () => {
    bookmarked
      ? localStorage.removeItem(`bookmark_${jobId}`)
      : localStorage.setItem(`bookmark_${jobId}`, "true");

    setBookmarked(!bookmarked);
    toast(bookmarked ? "Removed from saved jobs" : "Job saved");
  };

  if (pageLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!job) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Job not found</div>;
  }

  /* ================= AI SCORES (SMART MOCK) ================= */
  const aiMatch = resume ? Math.floor(70 + Math.random() * 25) : null;
  const keywordMatch = resume ? Math.floor(60 + Math.random() * 30) : null;
  const experienceMatch = resume ? Math.floor(65 + Math.random() * 25) : null;

  const aiVerdict =
    aiMatch >= 85 ? "Excellent Fit" :
    aiMatch >= 75 ? "Strong Match" :
    "Needs Improvement";

  const verdictColor =
    aiMatch >= 85 ? "text-green-600" :
    aiMatch >= 75 ? "text-indigo-600" :
    "text-orange-600";

  return (
    <div className="bg-slate-50 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white rounded-xl p-6 shadow">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <p className="text-gray-500">{job.companyId?.name}</p>
              </div>

              <button
                onClick={toggleBookmark}
                className={`px-3 py-1 rounded-full border text-sm ${
                  bookmarked ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
                }`}
              >
                {bookmarked ? "★ Saved" : "☆ Save"}
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              {job.location && <span>📍 {job.location}</span>}
              {job.experience && <span>🧠 {job.experience}</span>}
            </div>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-3">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* AI INSIGHTS */}
          {resume && (
            <div className="bg-white rounded-xl p-6 shadow space-y-4">
              <h2 className="font-semibold">AI Resume Analysis</h2>

              <div className="space-y-2 text-sm">
                <p className={`font-medium ${verdictColor}`}>
                  🤖 Verdict: {aiVerdict}
                </p>

                <div>
                  <p>AI Match Score: {aiMatch}%</p>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded"
                      style={{ width: `${aiMatch}%` }}
                    />
                  </div>
                </div>

                <p>Keyword Match: {keywordMatch}%</p>
                <p>Experience Alignment: {experienceMatch}%</p>

                <p className="text-xs text-gray-500">
                  💡 Tip: Add more role-specific keywords to improve ranking
                </p>
              </div>
            </div>
          )}

          {/* SIMILAR JOBS */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold mb-4">Similar Jobs</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {similarJobs.map(j => (
                <Link
                  key={j._id}
                  to={`/candidate/jobs/${j._id}`}
                  className="border rounded-lg p-4 hover:shadow transition"
                >
                  <h3 className="font-semibold">{j.title}</h3>
                  <p className="text-sm text-gray-500">{j.companyId?.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ================= APPLY CARD ================= */}
        <div className="hidden lg:block sticky top-24 h-fit">
          <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col gap-4">

            <h2 className="font-bold text-lg">Apply Smartly</h2>

            <label className="border border-dashed rounded-lg p-3 text-sm cursor-pointer hover:bg-indigo-50">
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setResume(file);
                  setResumeURL(URL.createObjectURL(file));
                }}
              />
              {resume ? resume.name : "Upload Resume (PDF)"}
            </label>

            {resumeURL && (
              <div className="max-h-56 overflow-auto border rounded-lg">
                <iframe
                  src={resumeURL}
                  title="Resume Preview"
                  className="w-full h-56"
                />
              </div>
            )}

            <button
              onClick={submitApplication}
              disabled={loading || applied}
              className={`w-full h-11 rounded-full font-semibold text-white transition
                ${
                  applied
                    ? "bg-green-500"
                    : loading
                    ? "bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
              `}
            >
              {applied ? "Applied ✓" : loading ? "Submitting…" : "Confirm & Apply"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE APPLY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3">
        <button
          onClick={submitApplication}
          disabled={loading || applied}
          className={`w-full h-12 rounded-full font-semibold text-white ${
            applied ? "bg-green-500" : "bg-indigo-600"
          }`}
        >
          {applied ? "Applied ✓" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

export default ApplyJob;
