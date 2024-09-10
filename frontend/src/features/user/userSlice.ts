import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./asyncThunks";
import { UserState } from "./types/UserState";

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // User Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
