import { materialRoutes } from "../../routes/materialRoutes";
import type { MaterialResponse } from "./types";

export const findAll = async (): Promise<MaterialResponse[]> => {
  const response = await materialRoutes.findAll();
  return response.data;
};
