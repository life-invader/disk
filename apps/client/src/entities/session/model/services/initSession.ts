import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth } from '../../api/sessionApi';
import type { IUser } from '../types';
import type { RootState } from '@/shared/types/store';

export const initSession = createAsyncThunk<IUser, void, { state: RootState }>(
  'session/initSession',
  async (_, { rejectWithValue }) => {
    const response = await checkAuth();

    if (response.data.user) {
      return response.data.user;
    }

    return rejectWithValue("Пользователь не найден");
  }, {
  condition: (_, { getState }) => {
    const { session } = getState();
    const { isLoading } = session;

    return !isLoading;
  }
}
);
