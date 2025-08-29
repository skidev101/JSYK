import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import toast from "react-hot-toast";

interface DownloadProps {
  profileImgUrl?: string;
  topic?: string;
  message?: string;
  themeColor: string;
}

export const useGetShareImage = () => {
  const axiosPrivate = useAxiosPrivate();
  const handleDownload = async ({
    profileImgUrl,
    topic,
    message,
    themeColor,
  }: DownloadProps) => {
    try {
      const response = await axiosPrivate.post(
        "/image",
        {
          profileImgUrl,
          topic,
          message,
          themeColor,
        },
        {
          responseType: "blob",
        }
      );

      console.log("response from downloadimg:", response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "message.png";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Image download failed:", err);
      toast.error("Download failed");
    }
  };
  return { handleDownload };
};
