import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      await registerUser(form);
      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-100
                    flex items-center justify-center px-4 py-10">

      {/* ================= CARD ================= */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl
                      border border-gray-100 p-7 sm:p-8 relative overflow-hidden">

        {/* SOFT TOP GLOW */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-200
                        rounded-full blur-3xl opacity-40 pointer-events-none" />

        {/* ================= BRAND ================= */}
        <div className="relative text-center mb-6">
          <img
            src={logo}
            alt="ATS-AI Logo"
            className="h-12 mx-auto mb-3"
          />

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
                           bg-indigo-50 text-indigo-600 mb-2">
            AI-powered hiring
          </span>

          <h1 className="text-xl font-semibold text-gray-900">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start hiring or finding jobs with AI
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-4 relative">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              placeholder="Aditya Tiwari"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-gray-300
                         px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-gray-300
                         px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300
                           px-4 py-2.5 pr-12 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center
                           text-gray-400 hover:text-indigo-600 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Register as
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-gray-300
                         px-4 py-2.5 text-sm bg-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
            >
              <option value="candidate">Candidate (Find jobs)</option>
              <option value="recruiter">Recruiter (Hire talent)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-lg font-semibold text-white
              transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97]"
              }
            `}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* ================= DIVIDER ================= */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ================= LOGIN ================= */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

        {/* ================= TRUST ================= */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Trusted by students, professionals & recruiters across India 🇮🇳
        </p>
      </div>
    </div>
  );
}

export default Register;
