import { useState } from 'react';
import axios from 'axios';
import { registerApi } from '../api';
import type { RegisterFormValues } from './schema';
import type { IRegisterApiError, RegisterResult } from './types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterFormValues): Promise<RegisterResult> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await registerApi(data);

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
