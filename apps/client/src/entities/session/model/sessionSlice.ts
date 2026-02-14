import { createSlice } from "@reduxjs/toolkit";
import { initSession } from "./services/initSession";
import { logout } from "@/features/auth/logout/model/logoutService";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ISessionState, IUser } from "./types";

const initialState: ISessionState = {
  isAuthenticated: false,
  isLoading: false,
  isInited: false,
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initSession.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(initSession.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInited = true;
    });

    builder.addCase(initSession.rejected, (state) => {
      state.isLoading = false;
      state.isInited = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    })
  },
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectIsInited: (state) => state.isInited,
  }
});

export const { setUser } = sessionSlice.actions
export const { selectIsAuthenticated, selectUser, selectIsInited } = sessionSlice.selectors;
export default sessionSlice.reducer
