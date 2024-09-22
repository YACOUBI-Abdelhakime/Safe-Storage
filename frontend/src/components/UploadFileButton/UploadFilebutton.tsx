import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../features/file-manager/asyncThunks";
import { addAlertMessage } from "../../features/global/globalSlice";
import { AlertType } from "../../features/global/types/AlertType";
import { AppDispatch } from "../../features/store";
import { validateFile } from "../../utils/formValidations/FormValidations";

export default function UploadFileButton() {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: FileList | null = e.target.files ? e.target.files : null;

    if (!files) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) {
        continue;
      }
      console.log("name = " + file.name);

      const fileError: string | null = validateFile(file, t);
      if (fileError) {
        const message: string = fileError;
        const type: AlertType = AlertType.ERROR;
        dispatch(addAlertMessage({ message, type }));
        continue;
      }

      // Upload file
      dispatch(uploadFile({ file }));
    }
  };

  return (
    <button
      className="fixed bottom-0 right-0 p-2 m-10 rounded-xl bg-blue-600 flex group hover:bg-blue-500"
      onClick={() => fileInput.current?.click()}
    >
      <input
        ref={fileInput}
        type="file"
        onChange={handleUploadFiles}
        className="hidden"
        multiple
      />
      <CloudArrowUpIcon className="h-7 w-7 text-white" />
      <p className="ml-2 text-white font-semibold">{t("Upload")}</p>
    </button>
  );
}
