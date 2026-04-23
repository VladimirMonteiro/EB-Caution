import type { CreateMilitaryRequest } from "../services/MilitaryService/types";
import api from "../utils/api";

export const militaryRoutes = {
    create: (data: CreateMilitaryRequest) => api.post(`${data.userId}/militaries`, data),
    findAll: (userId: string) => api.get(`${userId}/militaries`)
}