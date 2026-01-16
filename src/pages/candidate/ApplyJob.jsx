import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function ApplyJob() {
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);

    await api.post(`/applications/apply/${jobId}`, formData);

    setLoading(false);
    setMessage("🎉 Application submitted successfully!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Apply for this Job
        </h1>
        <p className="text-gray-500 mb-6">
          Upload your resume and take the next step in your career 🚀
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* FILE UPLOAD */}
          <label
            htmlFor="resume"
            className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-xl p-6 cursor-pointer hover:bg-indigo-50 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
              />
            </svg>

            {!resume ? (
              <>
                <p className="font-medium text-gray-700">
                  Click to upload your resume
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF only • Max 5MB
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-indigo-600">
                  {resume.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            )}

            <input
              id="resume"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </label>

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className={`w-full h-12 rounded-full text-white font-semibold transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] active:scale-95"
              }
            `}
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-center font-medium animate-fade-in">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyJob;
