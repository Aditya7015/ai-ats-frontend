import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

function CandidateLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-indigo-100 flex">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-40 h-full w-64
          bg-blue-900 text-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col p-5">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold">Candidate Panel</h2>
            <button
              className="lg:hidden text-xl"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* PROFILE */}
          <div className="mb-8 flex items-center gap-3 bg-white/10 p-3 rounded-xl">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
              U
            </div>
            <div>
              <p className="font-medium text-sm">Candidate</p>
              <p className="text-xs text-white/70">Job Seeker</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="flex-1 space-y-2">
            <NavItem
              to="/candidate/dashboard"
              label="Dashboard"
              icon="📊"
              active={isActive("/candidate/dashboard")}
              onClick={() => setSidebarOpen(false)}
            />
            <NavItem
              to="/candidate/jobs"
              label="Browse Jobs"
              icon="💼"
              active={isActive("/candidate/jobs")}
              onClick={() => setSidebarOpen(false)}
            />
            <NavItem
              to="/candidate/applications"
              label="My Applications"
              icon="📄"
              active={isActive("/candidate/applications")}
              onClick={() => setSidebarOpen(false)}
            />
          </nav>

          {/* LOGOUT */}
          <div className="pt-4 border-t border-white/20">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ================= BACKDROP (MOBILE) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">

        {/* MOBILE TOP BAR */}
        <header className="lg:hidden h-14 bg-white shadow flex items-center px-4">
          <button
            className="text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="ml-4 font-semibold text-gray-800">
            Candidate Panel
          </h1>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= NAV ITEM ================= */
function NavItem({ to, label, icon, active, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${
          active
            ? "bg-white text-blue-900 font-semibold shadow"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default CandidateLayout;
