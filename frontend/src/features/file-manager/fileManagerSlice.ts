import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types/FileManagerState";
import { getFilesData, uploadFile } from "./asyncThunks";

const initialState: UserState = {
  files: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "fileManagerReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload file
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Get files data
      .addCase(getFilesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
      })
      .addCase(getFilesData.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
