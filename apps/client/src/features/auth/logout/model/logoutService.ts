import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi } from "../api/logoutApi";

export const logout = createAsyncThunk("logout/logoutUser", async () => {
  await logoutApi()
});