import type { CreateLoadItemRequest, CreateLoadRequest, UpdateLoadItemRequest } from "../services/LoadService/types";
import api from "../utils/api";

const BASE = (userId: string) => `/${userId}/loads`;

export const loadRoutes = {
  create: (userId: string, data: CreateLoadRequest) => api.post(BASE(userId), data),
  findAll: (userId: string) => api.get(BASE(userId)),
  findById: (userId: string, loadId: string) => api.get(`${BASE(userId)}/${loadId}`),
  addLoadItem: (userId: string, loadId: string, materialId: string, data: CreateLoadItemRequest) =>
    api.post(`${BASE(userId)}/${loadId}/items/${materialId}`, data),
  removeLoadItem: (userId: string, loadId: string, materialId: string) =>
    api.delete(`${BASE(userId)}/${loadId}/items/${materialId}`),
  updateLoadItem: (userId: string, loadId: string, materialId: string, data: UpdateLoadItemRequest) =>
    api.put(`${BASE(userId)}/${loadId}/items/${materialId}`, data),
};
