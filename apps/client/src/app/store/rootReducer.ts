import { combineSlices } from "@reduxjs/toolkit";
import { sessionSlice } from "@entities/session";
import { fileSlice } from "@entities/file";

export const rootReducer = combineSlices(
  sessionSlice,
  fileSlice,
)