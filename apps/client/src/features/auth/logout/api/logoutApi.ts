import { apiClient } from "@/shared/api/apiClient"
import { apiRoutes } from "@/shared/api/routes"

export const logoutApi = async () => {
  await apiClient.post(apiRoutes.auth.logout)
}