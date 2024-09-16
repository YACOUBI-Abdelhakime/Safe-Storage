import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants/urls";
import { addAlertMessage } from "../global/globalSlice";
import { AlertType } from "../global/types/AlertType";
import { UploadDto } from "./types/dtos/UploadDto";

export const uploadFile = createAsyncThunk(
  "fileManagerReducer/uploadFile",
  async (uploadDto: UploadDto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.post(
        `${SERVER_URL}/file-manager`,
        uploadDto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);