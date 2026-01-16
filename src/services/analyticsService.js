import api from "./api";

export const getRecruiterAnalytics = () =>
  api.get("/analytics/recruiter");

export const getAdminAnalytics = () =>
  api.get("/analytics/admin");
