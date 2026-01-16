import api from "./api";

export const getApplicants = (jobId) =>
  api.get(`/applications/job/${jobId}`);

export const getAnalysis = (id) =>
  api.get(`/applications/analysis/${id}`);

export const updateStatus = (id, status) =>
  api.patch(`/applications/${id}/status`, { status });

export const getMyApplications = () =>
  api.get("/applications/my");
