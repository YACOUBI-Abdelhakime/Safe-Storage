import { Dialog, DialogPanel } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { deletePreviewUrl } from "../../features/file-manager/fileManagerSlice";
import { FileType } from "../../features/file-manager/types/enums/FileType.enum";
import { PreviewFile } from "../../features/file-manager/types/PreviewFile";
import { AppDispatch } from "../../features/store";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function FilePreviewModal() {
  const dispatch: AppDispatch = useDispatch();
  const previewFile: PreviewFile | null = useSelector(
    (state: any) => state.fileManagerReducer.previewFile
  );
  const showModal = previewFile?.previewUrl != null;
  const isImage = previewFile?.fileType === FileType.IMAGE;

  const close = () => {
    dispatch(deletePreviewUrl());
  };

  return (
    <>
      <Dialog
        open={showModal}
        as="div"
        className="relative z-10"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full items-center justify-center p-4 md:p-10">
            <DialogPanel
              transition
              className={`${
                isImage ? "" : "h-full w-full"
              }  rounded-xl border bg-white shadow-md p-3 text-black duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0`}
            >
              <div className="flex justify-center flex-col h-full w-full">
                <div className="flex justify-end">
                  <XMarkIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer"
                    onClick={close}
                  />
                </div>
                {isImage ? (
                  <div>
                    <img src={previewFile.previewUrl} alt="Preview" />
                  </div>
                ) : (
                  <div className="h-full border-b">
                    <iframe
                      src={previewFile?.previewUrl}
                      title="PDF Preview"
                      className="w-full h-full"
                      style={{ border: "none" }}
                    ></iframe>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
