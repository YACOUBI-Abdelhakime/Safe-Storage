import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import FileCard from "../../components/FileCard/FileCard";
import UploadFileButton from "../../components/UploadFileButton/UploadFilebutton";

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <div className="bg-white w-full h-full p-4 overflow-auto">
        <div className="flex flex-wrap justify-start">
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
          <FileCard />
        </div>
      </div>

      <UploadFileButton />
    </>
  );
}
