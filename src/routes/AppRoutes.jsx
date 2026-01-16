import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import JobList from "../pages/candidate/JobList";
import ApplyJob from "../pages/candidate/ApplyJob";
import Company from "../pages/recruiter/Company";
import Jobs from "../pages/recruiter/Jobs";
import Applicants from "../pages/recruiter/Applicants";
import CreateJob from "../pages/recruiter/CreateJob";
import MyApplications from "../pages/candidate/MyApplications";
import LandingPage from "../pages/public/LandingPage";
import Pricing from "../pages/common/Pricing";
import AIResumeBuilder from "../pages/AIResumeBuilder";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

        <Route
        path="/candidate/jobs"
        element={
            // <ProtectedRoute role="candidate">
            // <JobList />
            // </ProtectedRoute>
            <JobList />
        }
        />

        <Route
        path="/candidate/jobs/:jobId"
        element={
            <ProtectedRoute role="candidate">
            <ApplyJob />
            </ProtectedRoute>
        }
        />

        <Route
        path="/recruiter/company"
        element={
            <ProtectedRoute role="recruiter">
            <Company />
            </ProtectedRoute>
        }
        />

        <Route
        path="/recruiter/jobs"
        element={
            <ProtectedRoute role="recruiter">
            <Jobs />
            </ProtectedRoute>
        }
        />

        <Route
        path="/recruiter/jobs/:jobId/applicants"
        element={
            <ProtectedRoute role="recruiter">
            <Applicants />
            </ProtectedRoute>
        }
        />

        <Route
        path="/recruiter/jobs/create"
        element={
            <ProtectedRoute role="recruiter">
            <CreateJob />
            </ProtectedRoute>
        }
        />


        <Route
        path="/candidate/dashboard"
        element={
            <ProtectedRoute role="candidate">
            <CandidateDashboard />
            </ProtectedRoute>
        }
        />

        <Route
        path="/candidate/applications"
        element={
            <ProtectedRoute role="candidate">
            <MyApplications />
            </ProtectedRoute>
        }
        />

        <Route path="/airesumebuilder" element={<AIResumeBuilder />} />

        <Route path="/" element={<LandingPage />} />
        
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default AppRoutes;
