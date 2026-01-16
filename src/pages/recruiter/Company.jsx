import { useState } from "react";
import RecruiterLayout from "../../components/RecruiterLayout";
import { createCompany } from "../../services/companyService";
import toast from "react-hot-toast";

const INDUSTRY_SUGGESTIONS = [
  "Technology",
  "FinTech",
  "EdTech",
  "HealthTech",
  "E-commerce",
  "AI / ML",
  "SaaS",
  "Media",
  "Consulting",
  "Blockchain",
];

const COMPANY_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500+",
];

function Company() {
  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "",
    size: "",
  });

  const [industryInput, setIndustryInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===================== SUBMIT ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FRONTEND VALIDATION
    if (!form.name.trim()) {
      toast.error("Company name is required");
      return;
    }
    if (!form.industry.trim()) {
      toast.error("Please select an industry");
      return;
    }
    if (!form.size) {
      toast.error("Please select company size");
      return;
    }

    try {
      setLoading(true);
      await createCompany(form);
      toast.success("🎉 Company created successfully!");
      setForm({ name: "", website: "", industry: "", size: "" });
      setIndustryInput("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <RecruiterLayout>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= FORM ================= */}
        <div className="lg:col-span-2 bg-white border rounded-2xl shadow-lg p-8 relative overflow-hidden">
          {/* Decorative Gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60" />

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Company Profile
          </h1>
          <p className="text-gray-500 mb-8">
            This is how candidates see your brand
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Company Name */}
            <input
              placeholder="Company Name (e.g. Google)"
              value={form.name}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* Website */}
            <input
              placeholder="Company Website (https://example.com)"
              value={form.website}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) =>
                setForm({ ...form, website: e.target.value })
              }
            />

            {/* Industry */}
            <div>
              <label className="block font-medium mb-2">
                Industry
              </label>

              <input
                placeholder="Type or select industry"
                value={industryInput}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => {
                  setIndustryInput(e.target.value);
                  setForm({
                    ...form,
                    industry: e.target.value,
                  });
                }}
              />

              {industryInput && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {INDUSTRY_SUGGESTIONS.filter((i) =>
                    i.toLowerCase().includes(
                      industryInput.toLowerCase()
                    )
                  ).map((i) => (
                    <span
                      key={i}
                      onClick={() => {
                        setIndustryInput(i);
                        setForm({ ...form, industry: i });
                      }}
                      className="px-3 py-1 border rounded-full text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Company Size */}
            <div>
              <label className="block font-medium mb-2">
                Company Size
              </label>

              <div className="flex flex-wrap gap-3">
                {COMPANY_SIZES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() =>
                      setForm({ ...form, size: s })
                    }
                    className={`px-4 py-2 rounded-xl border transition transform hover:scale-105 ${
                      form.size === s
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100"
                    }`}
                  >
                    {s} employees
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t">
              <button
                disabled={loading}
                className={`px-8 py-3 rounded-xl text-white font-medium shadow transition transform ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }`}
              >
                {loading ? "Creating..." : "Create Company 🚀"}
              </button>
            </div>
          </form>
        </div>

        {/* ================= LIVE PREVIEW ================= */}
        <div className="bg-white border rounded-2xl shadow-lg p-6 sticky top-24 h-fit">
          <h2 className="font-semibold text-lg mb-4">
            Live Company Preview
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow">
              {form.name ? form.name[0].toUpperCase() : "C"}
            </div>

            <div>
              <h3 className="text-lg font-bold">
                {form.name || "Company Name"}
              </h3>
              <p className="text-sm text-gray-500">
                {form.industry || "Industry"}
              </p>
            </div>
          </div>

          <p className="text-sm text-blue-600 break-all">
            {form.website || "Company Website"}
          </p>

          <div className="mt-4">
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
              {form.size
                ? `${form.size} employees`
                : "Company size"}
            </span>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            This preview is visible to candidates
          </p>
        </div>
      </div>
    </RecruiterLayout>
  );
}

export default Company;
