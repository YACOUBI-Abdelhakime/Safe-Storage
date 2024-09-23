import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { renameFile } from "../../features/file-manager/asyncThunks";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { AppDispatch } from "../../features/store";
import { validateName } from "../../utils/formValidations/FormValidations";

export default function RenameFileModal({
  isOpen,
  setIsOpen,
  file,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  file: FileManager;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [nameError, setNameError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>(file.fileName);

  const close = (e: any) => {
    if (e) {
      e.preventDefault();
    }
    setIsOpen(false);
  };

  const fileNameChanged = (e: any) => {
    e.preventDefault();
    const newFileName = e.target.value;
    setFileName(newFileName);
    const nameError = validateName(newFileName, t);
    setNameError(nameError);
  };

  const onRenameFile = (e: any) => {
    e.preventDefault();
    // Validate name
    const nameError = validateName(fileName, t);
    setNameError(nameError);
    if (nameError) {
      return;
    }
    // Dispatch the rename file action
    dispatch(renameFile({ fileId: file._id, fileName }))
      .unwrap()
      .then(() => {
        close(e);
      });
  };

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border bg-white shadow-md p-6 text-black duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="font-semibold">
                {t("Rename")}
              </DialogTitle>
              <div className="my-4">
                <form onSubmit={onRenameFile} noValidate>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder={t("File name")}
                      className={`${
                        nameError !== null
                          ? "ring-red-500 ring-2"
                          : "border-gray-300"
                      } w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      name="fileName"
                      value={fileName}
                      onChange={fileNameChanged}
                    />
                    {nameError !== null && (
                      <p className="mt-2 text-red-500 text-sm">{nameError}</p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-row-reverse">
                    <button
                      className="rounded-lg bg-blue-600 hover:bg-blue-500 py-0.5 px-3 font-semibold text-white"
                      type="submit"
                    >
                      {t("Validate")}
                    </button>
                    <button
                      className="mr-2 px-3 text-sm/6 font-semibold text-blue-600 hover:font-bold"
                      onClick={close}
                    >
                      {t("Cancel")}
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
