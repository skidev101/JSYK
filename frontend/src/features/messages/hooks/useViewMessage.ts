import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface MessageData {
  topic?: string;
  content: string;
  profileImgUrl: string;
  topicImgUrls: string[];
  createdAt: string;
}

export const useViewMessage = (messageId: string) => {
  const { user } = useAuth();
  const [data, setData] = useState<MessageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!messageId) return;

    let isMounted = true;
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/messages/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.idToken}`,
            },
          }
        );
        isMounted && setData(response.data.data);
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to fetch topic data");
          setLoading(false);
        }
        console.error("Failed to fetch message data:", err)
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMessage();

    return (() => {
        isMounted = false;
    })
  }, [messageId]);

  return { data, loading, error };
};
