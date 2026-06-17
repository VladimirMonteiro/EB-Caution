// services/CautionService/index.ts


import api from "../../utils/api";
import type { CreateCautionRequest } from "./types";

export const createCaution = async (
  userId: string,
  data: CreateCautionRequest,
) => {
  const response = await api.post(`/${userId}/cautions`, data);
  return response.data;
};

export const findCautions = async (userId: string) => {
  const response = await api.get(`/${userId}/cautions`);
  return response.data;
};