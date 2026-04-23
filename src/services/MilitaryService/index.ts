import { militaryRoutes } from "../../routes/militaryRoutes";

import type { CreateMilitaryRequest, MilitaryResponse } from "./types";

const createMilitary = async (
  data: CreateMilitaryRequest,
): Promise<MilitaryResponse> => {
  try {
    const response = await militaryRoutes.create(data);

    return response.data;
  } catch (error) {
    throw new Error(`Ocorreu um erro ${error}`);
  }
};

const findAllMilitary = async (userId: string): Promise<MilitaryResponse[]> => {
  try {
    const response = await militaryRoutes.findAll(userId);

    return response.data;
  } catch (error) {
    throw new Error(`Ocorreu um erro ${error}`);
  }
};

export { createMilitary, findAllMilitary };
