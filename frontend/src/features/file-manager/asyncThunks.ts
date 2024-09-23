import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants/urls";
import { addAlertMessage } from "../global/globalSlice";
import { AlertType } from "../global/types/AlertType";
import { UploadFileDto } from "./types/dtos/UploadFileDto";
import { RenameFileDto } from "./types/dtos/RenameFileDto";
import { getFileType } from "./utils/getFileType";
import { FileType } from "./types/enums/FileType.enum";
import { savePreviewUrl } from "./fileManagerSlice";

export const uploadFile = createAsyncThunk(
  "fileManagerReducer/uploadFile",
  async (uploadDto: UploadFileDto, thunkAPI) => {
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

export const downloadFile = createAsyncThunk(
  "fileManagerReducer/downloadFile",
  async (
    { fileId, saveFile }: { fileId: string; saveFile: boolean },
    thunkAPI
  ) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(
        `${SERVER_URL}/file-manager/download/${fileId}`,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get fileName from the custom header
      // Fallback to fileId if not available
      const fileName = response.headers["filename"] || fileId;
      // Create a URL for the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      if (saveFile) {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        const fileExtension = fileName.split(".").pop();
        const fileType: FileType = getFileType("." + fileExtension);
        // Dispatch an action to save the preview URL in the state
        thunkAPI.dispatch(
          savePreviewUrl({
            previewUrl: url,
            fileType,
          })
        );
      }
      return;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFilesData = createAsyncThunk(
  "fileManagerReducer/getFilesData",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(`${SERVER_URL}/file-manager`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const renameFile = createAsyncThunk(
  "fileManagerReducer/renameFile",
  async (renameFileDto: RenameFileDto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.patch(
        `${SERVER_URL}/file-manager/${renameFileDto.fileId}`,
        { fileName: renameFileDto.fileName },
        {
          headers: {
            "Content-Type": "application/json",
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

export const deleteFile = createAsyncThunk(
  "fileManagerReducer/deleteFile",
  async (fileId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.delete(
        `${SERVER_URL}/file-manager/${fileId}`,
        {
          headers: {
            "Content-Type": "application/json",
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
