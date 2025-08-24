import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import type { Message } from "@/store/dashboardStore";

interface fetchOptions {
  topicId?: string;
  page?: number;
  limit?: number;
  append?: boolean;
}

interface FetchResponse {
  success: boolean;
  messages: Message[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNextPage: boolean;
  };
  unreadCount: number;
  message?: string;
}

interface TopicMessages {
  messages: Message[];
}

export const useTopicMessages = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState<TopicMessages | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const fetchTopicMessages = useCallback(
    async ({ topicId = "", page = 1, limit = 20, append = false }: fetchOptions = {}) => {
      if (!user || !user.idToken) {
        setLoading(false);
        console.log("leaving function because no user yet");
        return;
      }


      setLoading(true);
      setError("");

      try {
        const response = await axiosPrivate.get<FetchResponse>(
            `/message?page=${page}&limit=${limit}${
              topicId ? `&topic=${topicId}` : ""
            }`
        )

        const newMessages = await response.data || [];
        console.log("gotten the topic messages");

        setData((prev) => append ? [...prev.messages, ...newMessages] : newMessages)

      } catch (err) {
        console.error("Error fetching topic messages:", err);
        setError("Failed to load topic messages");
        toast.error("Failed to load topic messages");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const loadMore = useCallback(
    (page: number, topicId: string) => {
      fetchTopicMessages({ page, topicId, append: true });
    },
    [fetchTopicMessages]
  );

  return { data, loading, error, loadMore };
};
