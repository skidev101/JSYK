import { useAuth } from "@/context/AuthContext";
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
  const { user, firebaseUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<MessageData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!messageId || !user || !firebaseUser) return;

    let isMounted = true;

    const fetchMessage = async () => {
      setLoadingMessage(true);
      setError("");
      
      try {
        const response = await axiosPrivate.get(`/message/${messageId}`);
        const messageData = response.data.data;

        const topicImgUrls: string[] =
          Array.isArray(messageData.topicImgUrls) &&
          messageData.topicImgUrls.length > 0
            ? messageData.topicImgUrls
                .map((imgObj: any) => imgObj?.url) // extract url from object
                .filter((url: string | undefined) => !!url) // remove undefined/null
            : [];

        isMounted && setData({ ...messageData, topicImgUrls });
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
  }, [messageId, user, firebaseUser, axiosPrivate]);

  return { data, loadingMessage, error };
};
