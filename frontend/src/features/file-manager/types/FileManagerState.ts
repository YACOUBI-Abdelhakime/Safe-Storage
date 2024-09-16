import { FileManager } from "./FileManager";

export interface UserState {
  files: FileManager[];
  isLoading: boolean;
}
