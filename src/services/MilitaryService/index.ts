import { militaryRoutes } from "../../routes/militaryRoutes";
import type { CreateMilitaryRequest, MilitaryResponse } from "./types";

/**
 * MilitaryService
 * Pure async functions — no React state here.
 * All error propagation is left to the caller (the hook).
 */

export const createMilitary = async (
  userId: string,
  data: CreateMilitaryRequest,
): Promise<MilitaryResponse> => {
  const response = await militaryRoutes.create(userId, data);
  return response.data;
};

export const findAllMilitary = async (
  userId: string,
): Promise<MilitaryResponse[]> => {
  const response = await militaryRoutes.findAll(userId);
  return response.data;
};

export const findMilitaryById = async (
  userId: string,
  militaryId: string,
): Promise<MilitaryResponse> => {
  const response = await militaryRoutes.findById(userId, militaryId);
  return response.data;
};

export const removeMilitary = async (
  userId: string,
  militaryId: string,
): Promise<void> => {
  await militaryRoutes.remove(userId, militaryId);
};

export const updateMilitary = async (
  userId: string,
  militaryId: string,
  data: Partial<CreateMilitaryRequest>,
): Promise<MilitaryResponse> => {
  const response = await militaryRoutes.update(userId, militaryId, data);
  return response.data;
};
