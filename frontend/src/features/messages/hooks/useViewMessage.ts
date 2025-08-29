import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

interface MessageData {
  topic?: string;
  content: string;
  profileImgUrl: string;
  topicImgUrls: string[];
  createdAt: string;
  themeColor: string;
}

export const useViewMessage = (messageId: string) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<MessageData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!messageId) return;

    let isMounted = true;
    const fetchMessage = async () => {
      try {
        const response = await axiosPrivate.get(`/message/${messageId}`);
        isMounted && setData(response.data.data);
        console.log("viewMessage response:", response.data.data);
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to fetch topic data");
          setLoadingMessage(false);
        }
        console.error("Failed to fetch message data:", err);
      } finally {
        if (isMounted) setLoadingMessage(false);
      }
    };

    fetchMessage();

    return () => {
      isMounted = false;
    };
  }, [messageId]);

  return { data, loadingMessage, error };
};
