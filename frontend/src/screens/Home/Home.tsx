import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileCard from "../../components/FileCard/FileCard";
import UploadFileButton from "../../components/UploadFileButton/UploadFilebutton";
import { getFilesData } from "../../features/file-manager/asyncThunks";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { AppDispatch } from "../../features/store";

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();

  const filesData: FileManager[] = useSelector(
    (state: any) => state.fileManagerReducer.files
  );

  useEffect(() => {
    dispatch(getFilesData());
  }, []);

  return (
    <>
      <div className="bg-white w-full h-full p-4 overflow-auto">
        <div className="flex flex-wrap justify-start">
          {filesData.map((file: FileManager) => (
            <FileCard file={file} key={file._id} />
          ))}
        </div>
      </div>

      <UploadFileButton />
    </>
  );
}
