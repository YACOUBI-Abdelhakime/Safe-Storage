import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "../../components/FileCard/FileCard";
import UploadFileButton from "../../components/UploadFileButton/UploadFilebutton";
import { getFilesData } from "../../features/file-manager/asyncThunks";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { AppDispatch } from "../../features/store";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const filesData: FileManager[] = useSelector(
    (state: any) => state.fileManagerReducer.files
  );

  useEffect(() => {
    dispatch(getFilesData());
  }, []);

  return (
    <>
      <div className="bg-white w-full h-full p-4 overflow-auto">
        {filesData.length > 0 ? (
          <div className="flex flex-wrap justify-start">
            {filesData.map((file: FileManager) => (
              <FileCard file={file} key={file._id} />
            ))}
          </div>
        ) : (
          <div className="flex items-center  justify-center h-full w-full">
            <div className="flex flex-col items-center justify-center">
              <CloudArrowUpIcon className="h-32 w-32 text-blue-600" />
              <p className="text-center text-lg font-semibold">
                {t("Start by securely uploading your documents")}
              </p>
            </div>
          </div>
        )}
      </div>

      <UploadFileButton />
    </>
  );
}
