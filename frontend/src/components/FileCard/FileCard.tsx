import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function FileCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="lg:w-3/12 md:w-4/12 sm:w-6/12 w-full p-2">
        <div className="bg-gray-200 hover:bg-gray-300 h-32 rounded-lg shadow p-1 flex flex-col">
          <div className="py-2 px-3 flex items-center">
            <PhotoIcon className="h-6 w-6 text-blue-600" />
            <p className="ml-2 flex-grow">file_name.pdf</p>
            <EllipsisVerticalIcon
              role="button"
              className="h-6 w-6 text-gray-500"
            />
          </div>
          <div className="icon bg-white flex flex-grow items-center justify-center rounded-md">
            <PhotoIcon className="h-12 text-blue-600" />
          </div>
        </div>
      </div>
    </>
  );
}
