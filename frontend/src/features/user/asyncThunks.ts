import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SERVER_URL } from "../../utils/constants/urls";
import { User } from "./types/User";
import { AuthDto } from "./types/dtos/AuthDto";
import { AlertType } from "../global/types/AlertType";
import { addAlertMessage } from "../global/globalSlice";

// Create axios instance
const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

export const login = createAsyncThunk(
  "userReducer/login",
  async (login: AuthDto, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", login);
      const tokenPayload: any = jwtDecode(response.data.token);
      let user: User = tokenPayload.user;
      user.token = response.data.token;
      return user;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "userReducer/register",
  async (authDto: AuthDto, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", authDto);
      const tokenPayload: any = jwtDecode(response.data.token);
      let user: User = tokenPayload.user;
      user.token = response.data.token;
      return user;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
