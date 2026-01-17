import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecruiterLayout from "../../components/RecruiterLayout";
import {
  getApplicants,
  getAnalysis,
  updateStatus,
} from "../../services/applicationService";
import {
  getAiEmailTemplate,
  getAiInterviewQuestions,
  getAiCandidateComparison,
  getAiCandidateRanking,
  sendEmailToCandidate
} from "../../services/recruiterAiService";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  applied: "bg-blue-100 text-blue-700",
  shortlisted: "bg-green-100 text-green-700",
  interview: "bg-purple-100 text-purple-700",
  rejected: "bg-red-100 text-red-700",
};

function Applicants() {
  const { jobId } = useParams();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [aiData, setAiData] = useState({});
  const [aiLoadingId, setAiLoadingId] = useState(null);
  
  // New states for AI features
  const [emailModal, setEmailModal] = useState(null);
  const [questionsModal, setQuestionsModal] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [ranking, setRanking] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);


  // Add to existing states
  const [candidateSummary, setCandidateSummary] = useState(null);
  const [salaryAdvice, setSalaryAdvice] = useState(null);
  const [onboardingPlan, setOnboardingPlan] = useState(null);
  const [teamCompatibility, setTeamCompatibility] = useState(null);
  const [followUpSchedule, setFollowUpSchedule] = useState(null);
  const [diversityAnalysis, setDiversityAnalysis] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(null);
  const [showSalaryModal, setShowSalaryModal] = useState(null);

  /* ================= LOAD APPLICANTS ================= */
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await getApplicants(jobId);
        setApps(res.data || []);
      } catch {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  /* ================= AI SCORE (PER CARD) ================= */
  const loadAiScore = async (appId) => {
    try {
      setAiLoadingId(appId);
      const res = await getAnalysis(appId);
      setAiData((prev) => ({
        ...prev,
        [appId]: res.data,
      }));
    } catch {
      toast.error("Failed to fetch AI score");
    } finally {
      setAiLoadingId(null);
    }
  };

  /* ================= STATUS UPDATE ================= */
  const changeStatus = async (id, status) => {
    try {
      await updateStatus(id, status);
      setApps((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= AI FEATURES ================= */

  // Generate email template
  const handleGenerateEmail = async (appId, templateType) => {
    try {
      const response = await getAiEmailTemplate(appId, templateType);
      setGeneratedEmail(response);
      setEmailModal(appId);
      toast.success("Email template generated!");
    } catch (error) {
      toast.error("Failed to generate email template");
    }
  };

  // Generate interview questions
  const handleGenerateQuestions = async (appId) => {
    try {
      const response = await getAiInterviewQuestions(appId);
      setGeneratedQuestions(response);
      setQuestionsModal(appId);
      toast.success("Interview questions generated!");
    } catch (error) {
      toast.error("Failed to generate questions");
    }
  };

  // Compare selected candidates
  const handleCompareCandidates = async () => {
    if (selectedForCompare.length < 2) {
      toast.error("Select at least 2 candidates to compare");
      return;
    }

    try {
      setComparing(true);
      const response = await getAiCandidateComparison(selectedForCompare);
      // Handle comparison result - you can show in modal
      console.log("Comparison result:", response);
      toast.success("Comparison generated!");
      // You can set state to show comparison modal
    } catch (error) {
      toast.error("Failed to compare candidates");
    } finally {
      setComparing(false);
    }
  };

  // Rank all candidates
  const handleRankCandidates = async () => {
    try {
      const response = await getAiCandidateRanking(jobId);
      setRanking(response);
      toast.success("Candidates ranked!");
    } catch (error) {
      toast.error("Failed to rank candidates");
    }
  };

  // Send email to candidate
  const handleSendEmail = async (appId, emailData) => {
    try {
      const response = await sendEmailToCandidate(appId, emailData);
      toast.success("Email sent!");
      setEmailModal(null);
      setGeneratedEmail(null);
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  // Toggle candidate for comparison
  const toggleForCompare = (appId) => {
    setSelectedForCompare(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };


  // New AI feature handlers
const handleGenerateSummary = async (appId) => {
  try {
    const response = await getAiCandidateSummary(appId);
    setCandidateSummary(response);
    setShowSummaryModal(appId);
    toast.success("Candidate summary generated!");
  } catch (error) {
    toast.error("Failed to generate summary");
  }
};

const handleGenerateSalaryAdvice = async (appId) => {
  try {
    const currentOffer = prompt("Enter current offer amount (if any):");
    const candidateExpectation = prompt("Enter candidate's salary expectation (if known):");
    
    const response = await getAiSalaryAdvice(appId, currentOffer, candidateExpectation);
    setSalaryAdvice(response);
    setShowSalaryModal(appId);
    toast.success("Salary advice generated!");
  } catch (error) {
    toast.error("Failed to generate salary advice");
  }
};

const handleGenerateOnboardingPlan = async (appId) => {
  try {
    const response = await getAiOnboardingPlan(appId);
    setOnboardingPlan(response);
    toast.success("Onboarding plan generated!");
    // Show in modal or new section
  } catch (error) {
    toast.error("Failed to generate onboarding plan");
  }
};

const handleGenerateFollowUp = async (appId) => {
  try {
    const nextStep = prompt("Enter next step (e.g., 'Technical Interview', 'Offer Stage'):");
    const response = await getAiFollowUpSchedule(appId, nextStep);
    setFollowUpSchedule(response);
    toast.success("Follow-up schedule generated!");
  } catch (error) {
    toast.error("Failed to generate follow-up schedule");
  }
};

const handleAnalyzeDiversity = async () => {
  try {
    const response = await getAiDiversityAnalysis(jobId);
    setDiversityAnalysis(response);
    toast.success("Diversity analysis complete!");
  } catch (error) {
    toast.error("Failed to analyze diversity");
  }
};

  return (
    <RecruiterLayout>
      {/* HEADER WITH AI ACTIONS */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Applicants
            </h1>
            <p className="text-gray-500">
              Review candidates with AI-powered insights
            </p>
          </div>
          
          <div className="flex gap-3">
            {selectedForCompare.length > 0 && (
              <button
                onClick={handleCompareCandidates}
                disabled={comparing}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {comparing ? 'Comparing...' : `Compare (${selectedForCompare.length})`}
              </button>
            )}
            
            <button
              onClick={handleRankCandidates}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🤖 AI Rank All
            </button>
          </div>
        </div>
        
        {ranking && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">AI Ranking Results:</h3>
            <div className="flex flex-wrap gap-2">
              {ranking.ranking?.slice(0, 5).map((rank, idx) => (
                <div key={idx} className="bg-white px-3 py-1 rounded-full border">
                  <span className="font-bold text-blue-600">#{rank.rank}</span>
                  <span className="ml-2 text-sm">{rank.candidateName}</span>
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 rounded">
                    {rank.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border animate-pulse"
            >
              <div className="h-4 bg-gray-200 w-1/2 rounded mb-3" />
              <div className="h-3 bg-gray-200 w-1/3 rounded mb-6" />
              <div className="h-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : apps.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center">
          <h2 className="text-xl font-semibold">
            No applicants yet
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((a) => {
            const score = aiData[a._id]?.matchScore;
            const isSelectedForCompare = selectedForCompare.includes(a._id);

            return (
              <div
                key={a._id}
                className={`bg-white rounded-2xl border p-6 shadow hover:shadow-xl transition hover:-translate-y-1 ${
                  isSelectedForCompare ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {/* COMPARE CHECKBOX */}
                <div className="flex justify-between items-start mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelectedForCompare}
                      onChange={() => toggleForCompare(a._id)}
                      className="mr-2 h-4 w-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Compare</span>
                  </label>
                  
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[a.status]}`}
                  >
                    {a.status.toUpperCase()}
                  </span>
                </div>

                {/* TOP */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                    {a.candidateId?.name?.[0]?.toUpperCase() || "C"}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">
                      {a.candidateId?.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {a.candidateId?.email}
                    </p>
                  </div>
                </div>

                {/* AI SCORE */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    AI Match Score
                  </p>

                  {aiLoadingId === a._id ? (
                    <p className="text-sm text-gray-400">
                      Analyzing...
                    </p>
                  ) : score != null ? (
                    <div>
                      <p
                        className={`text-xl font-bold ${
                          score >= 70
                            ? "text-green-600"
                            : score >= 40
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {score}%
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleGenerateEmail(a._id, 'shortlisted')}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          ✉️ Email
                        </button>
                        <button
                          onClick={() => handleGenerateQuestions(a._id)}
                          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          ❓ Questions
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => loadAiScore(a._id)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        🤖 View AI Score
                      </button>
                    </div>
                  )}
                </div>

                {/* QUICK ACTIONS */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => handleGenerateEmail(a._id, 'shortlisted')}
                    className="text-xs px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    ✉️ Email
                  </button>
                  <button
                    onClick={() => handleGenerateQuestions(a._id)}
                    className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
                  >
                    ❓ Questions
                  </button>
                  <button
                    onClick={() => setSelected(a)}
                    className="text-xs px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 col-span-2"
                  >
                    📄 View Details
                  </button>
                </div>

                {/* STATUS UPDATE */}
                <select
                  value={a.status}
                  onChange={(e) => changeStatus(a._id, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-2"
                >
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            );
          })}
        </div>
      )}

      {/* EMAIL MODAL */}
      {emailModal && generatedEmail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEmailModal(null);
                setGeneratedEmail(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              Email to {generatedEmail.candidate?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {generatedEmail.candidate?.email}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={generatedEmail.email.subject}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body
                </label>
                <textarea
                  value={generatedEmail.email.body}
                  readOnly
                  rows={10}
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleSendEmail(emailModal, generatedEmail.email)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                >
                  📤 Send Email
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedEmail.email.body);
                    toast.success('Copied to clipboard!');
                  }}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUESTIONS MODAL */}
      {questionsModal && generatedQuestions && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setQuestionsModal(null);
                setGeneratedQuestions(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              Interview Questions for {generatedQuestions.candidateName}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {generatedQuestions.jobTitle}
            </p>

            <div className="space-y-6">
              {generatedQuestions.questions?.map((q, idx) => (
                <div key={idx} className="border rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-lg font-semibold">
                      Q{idx + 1}: {q.question}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      q.type === 'technical' ? 'bg-blue-100 text-blue-700' :
                      q.type === 'behavioral' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {q.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Purpose:</span> {q.purpose}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Ideal Answer:
                    </p>
                    <p className="text-sm text-gray-600">{q.idealAnswer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => {
                  const allQuestions = generatedQuestions.questions.map(q => q.question).join('\n\n');
                  navigator.clipboard.writeText(allQuestions);
                  toast.success('Questions copied!');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
              >
                📋 Copy All Questions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL - You can implement this based on the comparison response */}
      
      {/* DETAILED VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">
              {selected.candidateId?.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {selected.candidateId?.email}
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => handleGenerateEmail(selected._id, 'shortlisted')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  ✉️ Generate Email
                </button>
                <button
                  onClick={() => handleGenerateQuestions(selected._id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                >
                  ❓ Generate Questions
                </button>
              </div>

              {/* Add more candidate details here as needed */}
            </div>
          </div>
        </div>
      )}
    </RecruiterLayout>
  );
}

export default Applicants;