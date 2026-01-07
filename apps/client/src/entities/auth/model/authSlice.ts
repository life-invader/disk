import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuth: boolean
}

const initialState: IAuthState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
    },
    login: (state) => {
      state.isAuth = true;
    },
  },
});

export const { logout, login } = authSlice.actions
export default authSlice.reducer