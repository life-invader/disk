import { useState } from 'react';
import axios from 'axios';
import { loginApi } from '../api';
import { loginSchema } from './schema';
import { useAppDispatch } from '@/shared/lib/storeHooks';
import { setUser } from '@/entities/session';
import type { LoginFormValues } from './schema';
import type { ILoginApiError, RegisterResult } from './types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const register = async (data: LoginFormValues): Promise<RegisterResult> => {
    try {
      setIsLoading(true);
      setError(null);

      const payload = loginSchema.parse(data);
      const response = await loginApi(payload);
      dispatch(setUser(response.data.data.user));

      return response.data;
    } catch (err) {
      if (axios.isAxiosError<ILoginApiError>(err)) {
        const response = err.response?.data;

        if (response) {
          setError(response.message);
          return response;
        }
      }

      return { isSuccess: false, message: 'Что-то пошло не так', fieldErrors: {} };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
