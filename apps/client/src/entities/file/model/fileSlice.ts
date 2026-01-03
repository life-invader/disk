import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IFile {
  id: string;
  email: string;
}

export type IFileState = {
  data: IFile | null
};

const initialState: IFileState = {
  data: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<IFile>) => {
      state.data = action.payload;
    },
  },
});

export const { setFile } = fileSlice.actions
export default fileSlice.reducer