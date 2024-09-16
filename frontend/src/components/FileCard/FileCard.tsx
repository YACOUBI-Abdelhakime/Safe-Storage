import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { getFileType } from "../../features/file-manager/utils/getFileType";
import { FileType } from "../../features/file-manager/types/enums/FileType.enum";
import { DocumentIcon } from "@heroicons/react/24/solid";

export default function FileCard({ file }: { file: FileManager }) {
  return (
    <>
      <div className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2">
        <div className="bg-gray-200 hover:bg-gray-300 h-32 rounded-lg shadow p-1 flex flex-col">
          <div className="py-2 px-3 flex items-center">
            {getFileType(file) === FileType.IMAGE ? (
              <PhotoIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
            ) : (
              <DocumentIcon className="h-6 w-6 text-blue-600 flex-shrink-0" />
            )}
            <div className="ml-2 flex flex-grow truncate">
              <p className="truncate">{file.fileName}</p>
              <p className="bg-">{file.type}</p>
            </div>
            <EllipsisVerticalIcon
              role="button"
              className="h-6 w-6 text-gray-500 flex-shrink-0"
            />
          </div>
          <div className="icon bg-white flex flex-grow items-center justify-center rounded-md">
            {getFileType(file) === FileType.IMAGE ? (
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
