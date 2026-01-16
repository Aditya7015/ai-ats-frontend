import api from "./api";

export const createCompany = (data) =>
  api.post("/companies", data);
