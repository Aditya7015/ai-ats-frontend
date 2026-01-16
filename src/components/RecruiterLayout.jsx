import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function RecruiterLayout({ children }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path);

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-[#304C9F] text-white flex flex-col px-6 py-8 sticky top-0 h-screen">
        {/* BRAND */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-wide">
            ATS<span className="text-blue-200">-AI</span>
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            Recruiter Panel
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-2">
          <Link
            to="/recruiter/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive("/recruiter/dashboard")
                ? "bg-white text-[#304C9F] font-semibold shadow"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            📊 <span>Dashboard</span>
          </Link>

          <Link
            to="/recruiter/company"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive("/recruiter/company")
                ? "bg-white text-[#304C9F] font-semibold shadow"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            🏢 <span>Company</span>
          </Link>

          <Link
            to="/recruiter/jobs"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive("/recruiter/jobs")
                ? "bg-white text-[#304C9F] font-semibold shadow"
                : "text-blue-100 hover:bg-white/10"
            }`}
          >
            💼 <span>Jobs</span>
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="px-4">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="bg-white px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-800">
            Recruiter Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Welcome back 👋
            </span>

            <div className="w-9 h-9 bg-[#304C9F] text-white rounded-full flex items-center justify-center font-bold">
              R
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default RecruiterLayout;
