import { FileType } from "../types/enums/FileType.enum";
import { FileManager } from "../types/FileManager";

export function getFileType(file: FileManager): FileType {
  if (file.type === ".pdf") {
    return FileType.PDF;
  }

  return FileType.IMAGE;
}
