import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* Brand */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            ATS-AI
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your account to get started
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Register for free
        </h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Find jobs or hire smarter with AI
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Aditya Tiwari"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Register as
            </label>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="candidate">Candidate (Find jobs)</option>
              <option value="recruiter">Recruiter (Hire talent)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg
                       font-medium transition active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login CTA */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

        {/* Trust text */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Trusted by students, professionals & recruiters across India 🇮🇳
        </p>
      </div>
    </div>
  );
}

export default Register;
