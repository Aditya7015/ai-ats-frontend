import api from "./api";

export const getAllJobs = () => api.get("/jobs");
export const createJob = (data) => api.post("/jobs", data);
export const getRecruiterJobs = () => api.get("/jobs/company");
