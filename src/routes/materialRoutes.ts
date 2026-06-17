import api from "../utils/api";

export const materialRoutes = {
  findAll: () => api.get("/materials"),
};
