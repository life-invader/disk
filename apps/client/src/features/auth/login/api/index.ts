import { apiClient } from '@/shared/api/apiClient';
import { apiRoutes } from '@/shared/api/routes';
import type { ILoginApiSuccess } from '../model/types';
import type { LoginFormValues } from '../model/schema';

export const loginApi = (data: LoginFormValues) => {
  return apiClient.post<ILoginApiSuccess>(apiRoutes.auth.login, data);
};
