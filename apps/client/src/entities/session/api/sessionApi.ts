import { apiClient } from "@/shared/api/apiClient";
import { apiRoutes } from "@/shared/api/routes";
import type { IUser } from "../model/types";

export const checkAuth = async () => {
  const response = await apiClient.get<{ data: { user: IUser }, isSuccess: boolean }>(apiRoutes.auth.check);
  return response.data;
}