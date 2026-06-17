import { loadRoutes } from "../../routes/loadRoutes";
import type {
  CreateLoadItemRequest,
  CreateLoadRequest,
  LoadDetailsResponseDTO,
  LoadItemResponse,
  LoadResponse,
  UpdateLoadItemRequest,
} from "./types";

export const findAll = async (userId: string): Promise<LoadResponse[]> => {
  const response = await loadRoutes.findAll(userId);
  return response.data;
};

export const create = async (userId: string, data: CreateLoadRequest): Promise<LoadResponse> => {
  const response = await loadRoutes.create(userId, data);
  return response.data;
};

export const findById = async (userId: string, loadId: string): Promise<LoadDetailsResponseDTO> => {
  const response = await loadRoutes.findById(userId, loadId);
  return response.data;
};

export const addLoadItem = async (
  userId: string,
  loadId: string,
  materialId: string,
  data: CreateLoadItemRequest,
): Promise<LoadItemResponse> => {
  const response = await loadRoutes.addLoadItem(userId, loadId, materialId, data);
  return response.data;
};

export const removeLoadItem = async (userId: string, loadId: string, materialId: string): Promise<void> => {
  await loadRoutes.removeLoadItem(userId, loadId, materialId);
};

export const updateLoadItem = async (
  userId: string,
  loadId: string,
  materialId: string,
  data: UpdateLoadItemRequest,
): Promise<LoadItemResponse> => {
  const response = await loadRoutes.updateLoadItem(userId, loadId, materialId, data);
  return response.data;
};
