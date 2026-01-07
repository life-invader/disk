import { useState } from 'react';
import { registerApi } from '../api';
import type { LoginFormValues } from './schema';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await registerApi(data);

      return response.data;
    } catch (e) {
      setError('Ошибка регистрации');
      throw e;
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
