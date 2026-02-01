import { useState } from 'react';
import axios from 'axios';
import { registerApi } from '../api';
import { registerApiSchema } from './apiSchema';
import { useAppDispatch } from '@/shared/lib/storeHooks';
import { setUser } from '@/entities/session';
import type { RegisterFormValues } from './schema';
import type { IRegisterApiError, RegisterResult } from './types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const register = async (data: RegisterFormValues): Promise<RegisterResult> => {
    try {
      setIsLoading(true);
      setError(null);

      const payload = registerApiSchema.parse(data);
      const response = await registerApi(payload);
      dispatch(setUser(response.data.data.user));

      return response.data;
    } catch (err) {
      if (axios.isAxiosError<IRegisterApiError>(err)) {
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
