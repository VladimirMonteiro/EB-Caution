/**
 * militaryRoutes.ts
 * Replace the `api` import with your actual axios instance.
 */
import api from "../utils/api"; // your axios instance
import type {
  CreateMilitaryRequest,
  MilitaryResponse,
} from "../services/MilitaryService/types";

const BASE = (userId: string) => `/${userId}/militaries`;

export const militaryRoutes = {
  create: (userId: string, data: CreateMilitaryRequest) =>
    api.post<MilitaryResponse>(BASE(userId), data),

  findAll: (userId: string) => api.get<MilitaryResponse[]>(BASE(userId)),

  findById: (userId: string, militaryId: string) =>
    api.get<MilitaryResponse>(`${BASE(userId)}/${militaryId}`),

  update: (
    userId: string,
    militaryId: string,
    data: Partial<CreateMilitaryRequest>,
  ) => api.put<MilitaryResponse>(`${BASE(userId)}/${militaryId}`, data),

  remove: (userId: string, militaryId: string) =>
    api.delete<void>(`${BASE(userId)}/${militaryId}`),
};
