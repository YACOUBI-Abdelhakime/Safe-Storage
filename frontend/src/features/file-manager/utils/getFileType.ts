import { FileType } from "../types/enums/FileType.enum";

export function getFileType(fileType: string): FileType {
  if (fileType === ".pdf") {
    return FileType.PDF;
  }

  return FileType.IMAGE;
}
