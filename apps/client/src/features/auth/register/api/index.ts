import { apiClient } from '@/shared/api/apiClient';

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
};

export const registerApi = (data: RegisterRequest) => {
  return apiClient.post<RegisterResponse>('/auth/register', data);
};
