import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

interface DownloadProps {
  profileImgUrl?: string;
  topic?: string;
  message?: string;
  themeColor: string;
}

export const useGetShareImage = () => {
  const { user } = useAuth();
  const handleDownload = async ({
    profileImgUrl,
    topic,
    message,
    themeColor,
  }: DownloadProps) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/image/",
        {
          profileImgUrl,
          topic,
          message,
          themeColor,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
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
