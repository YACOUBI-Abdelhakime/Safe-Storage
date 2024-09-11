import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyAlertMessage } from "../../features/global/globalSlice";
import { AlertType } from "../../features/global/types/AlertType";
import { AppDispatch } from "../../features/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Alert() {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { message, type }: { message: string; type: AlertType } = useSelector(
    (state: any) => state.globalReducer
  );
  const closeAlert = () => {
    dispatch(emptyAlertMessage());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {message && (
        <div className="relative">
          <div
            className={`${
              type === AlertType.ERROR ? "bg-red-500" : "bg-green-500"
            } rounded-none absolute top-16 left-0 w-full z-10 p-4 font-semibold`}
          >
            <div className="container mx-auto flex justify-between items-center">
              <span>{t(message)}</span>
              <XMarkIcon
                className="h-6 w-6 text-gray-700 hover:text-gray-900 cursor-pointer"
                onClick={closeAlert}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
