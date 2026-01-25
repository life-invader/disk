import { apiClient } from '@/shared/api/apiClient';
import { apiRoutes } from '@/shared/api/routes';
import type { IRegisterApiSuccess } from '../model/types';
import type { RegisterPayload } from '../model/apiSchema';

export const registerApi = (data: RegisterPayload) => {
  return apiClient.post<IRegisterApiSuccess>(apiRoutes.auth.register, data);
};
