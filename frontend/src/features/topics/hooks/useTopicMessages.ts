import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import type { Message } from "@/store/dashboardStore";

interface fetchOptions {
  topicId: string;
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

export const useTopicMessages = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState<FetchResponse["pagination"] | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const fetchTopicMessages = useCallback(
    async ({ topicId, page = 1, limit = 20, append = false }: fetchOptions) => {
      if (!user || !user.idToken || !topicId) {
        setLoading(false);
        console.log("leaving function because no user or topicId yet");
        return;
      }
      setLoading(true);
      setError("");

      try {
        const response = await axiosPrivate.get<FetchResponse>(
            `/message?page=${page}&limit=${limit}&topic=${topicId}`
        )

        const { messages: newMessages, pagination, unreadCount } = response.data;
        console.log("gotten the topic messages", response.data);

        setMessages((prev) => {
          if (append) {
            return [...prev, ...newMessages]
          }
          return [...newMessages]
        });
        setPagination(pagination);
        setUnreadCount(unreadCount);


      } catch (err) {
        console.error("Error fetching topic messages:", err);
        setError("Failed to load topic messages");
        toast.error("Failed to load topic messages");
      } finally {
        setLoading(false);
      }
    },
    [user, axiosPrivate]
  );

  const loadMore = useCallback(
    (page: number, topicId: string) => {
      fetchTopicMessages({ page, topicId, append: true });
    },
    [fetchTopicMessages]
  );

  return { messages, pagination, unreadCount, fetchTopicMessages, loading, error, loadMore };
};
