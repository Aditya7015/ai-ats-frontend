import { useState } from "react";
import RecruiterLayout from "../../components/RecruiterLayout";
import { createJob } from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const SKILL_SUGGESTIONS = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Next.js",
  "AWS",
  "Docker",
  "Git",
  "REST API",
  "GraphQL",
];

function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: [],
    experience: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });

  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  /* ===================== SKILLS ===================== */
  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (skillInput.trim()) {
        setForm({
          ...form,
          skills: [...new Set([...form.skills, skillInput.trim()])],
        });
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
  };

  /* ===================== AI JD ===================== */
  const generateJD = () => {
    const jd = `
We are looking for a ${form.title || "talented professional"} to join our growing team.

Responsibilities:
• Build and maintain scalable applications
• Collaborate with designers and backend teams
• Write clean, optimized, and maintainable code
• Participate in code reviews and team discussions

Requirements:
• Strong knowledge of ${
      form.skills.length ? form.skills.join(", ") : "relevant technologies"
    }
• ${form.experience || "Relevant experience"} preferred
• Good problem-solving skills
• Passion for learning and growth

Job Details:
• Location: ${form.location || "Flexible"}
• Job Type: ${form.jobType}
• Salary: ${form.salary || "As per industry standards"}

If you are excited to work in a fast-paced environment, we would love to hear from you!
`;

    setForm({ ...form, description: jd.trim() });
  };

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and Description are required");
      return;
    }

    await createJob({
      ...form,
      skills: form.skills,
    });

    navigate("/recruiter/jobs");
  };

  return (
    <RecruiterLayout>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= FORM ================= */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Job Post
          </h1>
          <p className="text-gray-500 mb-8">
            Post a job and reach thousands of candidates
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <input
              placeholder="Job Title (e.g. MERN Stack Developer)"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            {/* Job Description */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Job Description</label>
                <button
                  type="button"
                  onClick={generateJD}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✨ Generate with AI
                </button>
              </div>

              <textarea
                rows="6"
                placeholder="Describe responsibilities, requirements, etc."
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block font-medium mb-2">
                Required Skills
              </label>

              <div className="flex flex-wrap gap-2 mb-2">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-100 hover:text-red-600 transition"
                  >
                    {skill} ✕
                  </span>
                ))}
              </div>

              <input
                value={skillInput}
                placeholder="Type skill and press Enter"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />

              {skillInput && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILL_SUGGESTIONS.filter(
                    (s) =>
                      s.toLowerCase().includes(skillInput.toLowerCase()) &&
                      !form.skills.includes(s)
                  ).map((s) => (
                    <span
                      key={s}
                      onClick={() => {
                        setForm({
                          ...form,
                          skills: [...form.skills, s],
                        });
                        setSkillInput("");
                      }}
                      className="border px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition"
                    >
                      + {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experience + Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Experience (e.g. 1-3 years)"
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />

              <input
                placeholder="Salary (₹4–8 LPA)"
                className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setForm({ ...form, salary: e.target.value })
                }
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block font-medium mb-2">
                Job Type
              </label>
              <div className="flex gap-3">
                {["Full-time", "Internship", "Remote"].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() =>
                      setForm({ ...form, jobType: type })
                    }
                    className={`px-4 py-2 rounded-lg border transition ${
                      form.jobType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <input
              placeholder="Location (Remote / Bengaluru / Delhi)"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow transform hover:scale-105 transition">
                Publish Job 🚀
              </button>
            </div>
          </form>
        </div>

        {/* ================= LIVE PREVIEW ================= */}
        <div className="bg-white border rounded-xl shadow-md p-6 sticky top-24 h-fit">
          <h2 className="font-semibold text-lg mb-4">
            Live Job Preview
          </h2>

          <h3 className="text-xl font-bold text-blue-600">
            {form.title || "Job Title"}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {form.location || "Location"} • {form.jobType}
          </p>

          <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">
            {form.description || "Job description will appear here"}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {form.skills.map((s) => (
              <span
                key={s}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {s}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm">
            <strong>Experience:</strong>{" "}
            {form.experience || "—"}
          </p>

          <p className="text-sm">
            <strong>Salary:</strong> {form.salary || "—"}
          </p>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default CreateJob;
