import FileCard from "../../components/FileCard/FileCard";
import UploadFileButton from "../../components/UploadFileButton/UploadFilebutton";

export default function HomeScreen() {
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
