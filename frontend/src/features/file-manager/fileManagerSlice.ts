import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types/FileManagerState";
import { uploadFile } from "./asyncThunks";

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
      });
  },
});

export default userSlice.reducer;
