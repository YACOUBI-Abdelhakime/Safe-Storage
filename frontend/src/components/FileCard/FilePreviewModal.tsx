import { Dialog, DialogPanel } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { deletePreviewUrl } from "../../features/file-manager/fileManagerSlice";
import { FileType } from "../../features/file-manager/types/enums/FileType.enum";
import { PreviewFile } from "../../features/file-manager/types/PreviewFile";
import { AppDispatch } from "../../features/store";

export default function FilePreviewModal() {
  const dispatch: AppDispatch = useDispatch();
  const previewFile: PreviewFile | null = useSelector(
    (state: any) => state.fileManagerReducer.previewFile
  );
  const showModal = previewFile?.previewUrl != null;

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
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="max-w-4xl rounded-xl border bg-white shadow-md p-3 text-black duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-center">
                {previewFile?.fileType === FileType.IMAGE ? (
                  <img src={previewFile.previewUrl} alt="Preview" />
                ) : (
                  // <iframe
                  //   src={previewFile?.previewUrl}
                  //   width="600"
                  //   height="400"
                  //   title="PDF Preview"
                  // ></iframe>
                  <p>not working</p>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
