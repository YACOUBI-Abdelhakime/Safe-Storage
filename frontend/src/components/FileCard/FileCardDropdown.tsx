import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  deleteFile,
  downloadFile,
} from "../../features/file-manager/asyncThunks";
import { FileManager } from "../../features/file-manager/types/FileManager";
import { addAlertMessage } from "../../features/global/globalSlice";
import { AlertType } from "../../features/global/types/AlertType";
import { AppDispatch } from "../../features/store";
import MyModal from "./RenameFileModel";

export default function FileCardDropdown({ file }: { file: FileManager }) {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const onDownloadFile = (file: FileManager) => {
    dispatch(downloadFile(file._id));
  };
  const onOpenRenameFileModel = () => {
    setIsOpen(true);
  };
  const onDeleteFile = (file: FileManager) => {
    dispatch(deleteFile(file._id))
      .unwrap()
      .then(() => {
        const message: string = t("File {{fileName}} deleted successfully", {
          fileName: '"' + file.fileName + file.type + '"',
        });
        const type: AlertType = AlertType.SUCCESS;
        dispatch(addAlertMessage({ message, type }));
      });
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5">
            <EllipsisVerticalIcon className="h-6 w-6 text-gray-500 flex-shrink-0" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <div
                className="flex block pl-4 pr-10 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                onClick={() => {
                  onDownloadFile(file);
                }}
              >
                <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                <p className="ml-2">{t("Download")}</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className="flex block pl-4 pr-10 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                onClick={() => {
                  onOpenRenameFileModel();
                }}
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                <p className="ml-2">{t("Rename")}</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div
                className="flex block pl-4 pr-10 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                onClick={() => {
                  onDeleteFile(file);
                }}
              >
                <TrashIcon className="h-5 w-5 text-gray-500" />
                <p className="ml-2">{t("Delete")}</p>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} file={file} />
    </>
  );
}
