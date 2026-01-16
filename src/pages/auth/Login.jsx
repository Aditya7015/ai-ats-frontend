import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    dispatch(loginSuccess(res.data));

    if (res.data.role === "candidate") {
      navigate("/candidate/dashboard");
    } else if (res.data.role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* Logo / Brand */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            ATS-AI
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Smart hiring & job discovery platform
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Login to your account
        </h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Welcome back! Please enter your details
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <span className="text-sm text-indigo-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg
                       font-medium transition active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Register CTA */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up for free
          </Link>
        </p>

        {/* Trust text */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Trusted by candidates & recruiters across India 🇮🇳
        </p>
      </div>
    </div>
  );
}

export default Login;
