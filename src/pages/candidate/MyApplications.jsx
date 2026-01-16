import { useEffect, useState } from "react";
import CandidateLayout from "../../components/CandidateLayout";
import { getMyApplications } from "../../services/applicationService";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApps(res.data));
  }, []);

  return (
    <CandidateLayout>
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            My Applications
          </h1>
          <p className="text-gray-600 mt-1">
            Track the status of jobs you’ve applied for
          </p>
        </div>

        {/* Empty State */}
        {apps.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
            <p className="text-gray-500 text-sm">
              You haven’t applied to any jobs yet.
            </p>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="group bg-white border border-gray-200 rounded-xl p-6
                         hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Job Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                    {app.jobId.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Application ID: <span className="font-medium">{app._id.slice(-6)}</span>
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold
                      ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </CandidateLayout>
  );
}

export default MyApplications;
