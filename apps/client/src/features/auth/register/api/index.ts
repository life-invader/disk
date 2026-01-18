import { apiClient } from '@/shared/api/apiClient';
import { apiRoutes } from '@/shared/api/routes';
import type { RegisterFormValues } from '../model/schema';
import type { IRegisterApiSuccess } from '../model/types';

export const registerApi = (data: RegisterFormValues) => {
  return apiClient.post<IRegisterApiSuccess>(apiRoutes.auth.register, data);
};
