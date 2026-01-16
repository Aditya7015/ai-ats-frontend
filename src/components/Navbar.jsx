import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../store/authSlice";

function Navbar() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <div className="w-full text-sm">

      {/* TOP PROMO BAR */}
      <div className="text-center font-medium py-2 text-white bg-linear-to-r from-violet-500 via-purple-600 to-orange-400">
        <p>
          Exclusive Price Drop! Hurry,{" "}
          <span className="underline underline-offset-2">
            Offer Ends Soon!
          </span>
        </p>
      </div>

      {/* MAIN NAV */}
      <nav className="relative h-17.5 flex items-center justify-between px-6 md:px-16 lg:px-24 bg-white text-gray-900 shadow">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          ATS-AI
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-20 text-sm font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/candidate/jobs">Jobs</Link></li>
          <li><Link to="/airesumebuilder">AI Resume Builder</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
        </ul>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {!token && (
            <>
              <Link to="/login" className="text-indigo-600 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition"
              >
                Register
              </Link>
            </>
          )}

          {token && role === "candidate" && (
            <>
              <Link to="/candidate/dashboard">Dashboard</Link>
              <Link to="/candidate/applications">Applications</Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}

          {token && role === "recruiter" && (
            <>
              <Link to="/recruiter/dashboard">Dashboard</Link>
              <Link to="/recruiter/jobs">My Jobs</Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin/dashboard">Admin Panel</Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="menu"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="M3 7h24M3 15h24M3 23h24" stroke="black" strokeWidth="2" />
          </svg>
        </button>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute top-17.5 left-0 w-full bg-white shadow-md p-6 md:hidden z-50">
            <ul className="flex flex-col space-y-4 text-sm font-medium">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/candidate/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link></li>
              <li><Link to="/internships" onClick={() => setMenuOpen(false)}>Internships</Link></li>
              <li><Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
            </ul>

            <div className="mt-6 space-y-3">
              {!token && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center border border-gray-300 py-2 rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block text-center bg-indigo-600 text-white py-2 rounded-full"
                  >
                    Register
                  </Link>
                </>
              )}

              {token && (
                <button
                  onClick={handleLogout}
                  className="w-full border border-gray-300 py-2 rounded-full text-red-500"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
