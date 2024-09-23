import { DocumentIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { downloadFile } from "../../features/file-manager/asyncThunks";
import { FileType } from "../../features/file-manager/types/enums/FileType.enum";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { getFileType } from "../../features/file-manager/utils/getFileType";
import { AppDispatch } from "../../features/store";
import FileCardDropdown from "./FileCardDropdown";

export default function FileCard({ file }: { file: FileManager }) {
  const dispatch: AppDispatch = useDispatch();
  const onPreviewFile = () => {
    dispatch(downloadFile({ fileId: file._id, saveFile: false }));
  };
  return (
    <>
      <div className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2">
        <div className="bg-gray-200 hover:bg-gray-300 h-32 rounded-lg shadow p-1 flex flex-col">
          <div className="py-2 px-3 flex items-center">
            {getFileType(file.type) === FileType.IMAGE ? (
              <PhotoIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
            ) : (
              <DocumentIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
            )}
            <div className="ml-2 flex flex-grow truncate">
              <p className="truncate">{file.fileName}</p>
              <p className="bg-">{file.type}</p>
            </div>
            <FileCardDropdown file={file} key={file._id} />
          </div>
          <div
            className="icon bg-white flex flex-grow items-center justify-center rounded-md"
            onClick={onPreviewFile}
          >
            {getFileType(file.type) === FileType.IMAGE ? (
              <PhotoIcon className="h-12 text-blue-600" />
            ) : (
              <DocumentIcon className="h-12 text-blue-600" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
