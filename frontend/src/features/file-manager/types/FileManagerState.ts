import { FileManager } from "./FileManager";
import { PreviewFile } from "./PreviewFile";

export interface UserState {
  files: FileManager[];
  previewFile: PreviewFile | null;
  isLoading: boolean;
}
