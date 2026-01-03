import { combineSlices } from "@reduxjs/toolkit";
import { authSlice } from "@features/auth";
import { userSlice } from "@entities/user";
import { fileSlice } from "@entities/file";

export const rootReducer = combineSlices(
  authSlice,
  userSlice,
  fileSlice,
)