import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

function CandidateLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-100 to-indigo-100">
      
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300 bg-blue-900/90 backdrop-blur-xl text-white p-5 flex flex-col`}
      >
        {/* LOGO / TITLE */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h2 className="text-xl font-bold tracking-wide">
              Candidate Panel
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/80 hover:text-white transition"
          >
            ☰
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="mb-8 flex items-center gap-3 bg-white/10 p-3 rounded-xl">
          <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
            U
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium text-sm">Candidate</p>
              <p className="text-xs text-white/70">Job Seeker</p>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">
          <NavItem
            to="/candidate/dashboard"
            label="Dashboard"
            active={isActive("/candidate/dashboard")}
            collapsed={collapsed}
            icon="📊"
          />
          <NavItem
            to="/candidate/jobs"
            label="Browse Jobs"
            active={isActive("/candidate/jobs")}
            collapsed={collapsed}
            icon="💼"
          />
          <NavItem
            to="/candidate/applications"
            label="My Applications"
            active={isActive("/candidate/applications")}
            collapsed={collapsed}
            icon="📄"
          />
        </nav>

        {/* LOGOUT */}
        <div className="pt-4 border-t border-white/20">
          <LogoutButton />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[calc(100vh-3rem)] animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

/* NAV ITEM COMPONENT */
function NavItem({ to, label, active, collapsed, icon }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${
          active
            ? "bg-white text-blue-900 shadow font-semibold"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default CandidateLayout;
