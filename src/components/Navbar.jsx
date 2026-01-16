import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../store/authSlice";
import logo from "../assets/logo.png";

function Navbar() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* ================= PROMO BAR ================= */}
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500
                      text-white text-center py-2 text-xs sm:text-sm font-medium">
        🚀 AI Resume Builder at 50% off —{" "}
        <span className="underline underline-offset-2 cursor-pointer">
          Upgrade now
        </span>
      </div>

      {/* ================= NAV ================= */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between
                        px-4 sm:px-6 md:px-12 lg:px-20 h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="TalentIQ AI"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* ================= DESKTOP LINKS ================= */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-700">
            <li className="relative group">
              <Link to="/">Home</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all" />
            </li>
            <li className="relative group">
              <Link to="/candidate/jobs">Jobs</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all" />
            </li>
            <li className="relative group">
              <Link to="/airesumebuilder">AI Resume Builder</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all" />
            </li>
            <li className="relative group">
              <Link to="/pricing">Pricing</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all" />
            </li>
          </ul>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden lg:flex items-center gap-5">

            {!token && (
              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-full bg-indigo-600 text-white
                             font-semibold shadow-md hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}

            {token && (
              <>
                {role === "candidate" && (
                  <>
                    <Link to="/candidate/dashboard">Dashboard</Link>
                    <Link to="/candidate/applications">Applications</Link>
                  </>
                )}

                {role === "recruiter" && (
                  <>
                    <Link to="/recruiter/dashboard">Dashboard</Link>
                    <Link to="/recruiter/jobs">My Jobs</Link>
                  </>
                )}

                {role === "admin" && (
                  <Link to="/admin/dashboard">Admin Panel</Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ================= BACKDROP ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-9998 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE MENU (FULL SCREEN) ================= */}
      <div
        className={`fixed inset-0 z-9999 bg-white lg:hidden
                    transition-transform duration-300 ease-in-out
                    ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex flex-col h-full px-6 pt-6">

          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between mb-10">
            <img src={logo} alt="Logo" className="h-14" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-6 text-lg font-semibold text-gray-800">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/candidate/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
            <Link to="/airesumebuilder" onClick={() => setMenuOpen(false)}>AI Resume Builder</Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          </div>

          {/* CTA / AUTH */}
          <div className="mt-auto space-y-4 pb-10">

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center border py-3 rounded-full"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-indigo-600 text-white py-3 rounded-full"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full border py-3 rounded-full text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
