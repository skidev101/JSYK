import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useDashboardStore } from "@/store/dashboardStore";

interface fetchOptions {
  topicId?: string;
  page?: number;
  limit?: number;
  append?: boolean;
  silent?: boolean; 
}

export interface Message {
  _id: string;
  content: string;
  topicId?: string;
  topicSlug?: string;
  topic?: string;
  createdAt: string;
  isRead: boolean;
  themeColor: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GetUserMessagesResponse {
  success: boolean;
  messages: Message[];
  pagination: Pagination;
  unreadCount: number;
  message?: string; // only when no messages
}


export const useDashboardData = () => {
  const { user } = useAuth();
  const {
    data,
    loading,
    error,
    lastFetched,
    setData,
    setLoading,
    setError,
    setLastFetched,
  } = useDashboardStore();
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchDashboardData = useCallback(
    async (options: fetchOptions = {}) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { topicId = "", page = 1, limit = 20, append = false, silent = false } = options;

      try {
        if (!silent) {
          if (append) {
            setLoadingMore(true);

          } else {
            setLoading(true);
          }
        }
        setError(null);

        const config = {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        };

        const [topicsRes, messagesRes] = await Promise.all([
          axios.get("http://127.0.0.1:3000/api/topic", config),
          axios.get<GetUserMessagesResponse>(
            `http://127.0.0.1:3000/api/message?page=${page}&limit=${limit}${
              topicId ? `&topic=${topicId}` : ""
            }`,
            config
          ),
        ]);

        const topics = topicsRes.data.topics || [];
        const transformedTopics = topics.map((topic: any) => ({
          _id: topic._id,
          url: topic.topicLink,
          createdAt: topic.createdAt,
          topic: topic.topic,
        }));

        const newMessages = messagesRes.data.messages || [];

        setData({
          topics: transformedTopics,
          messages: append ? [...data.messages, ...newMessages] : newMessages,
          unreadCount: messagesRes.data.unreadCount || "0",
          pagination: messagesRes.data.pagination || "",
        });

        setLastFetched(Date.now());
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        if (!silent) append ? setLoadingMore(false) : setLoading(false);
      }
    },
    [user, setData, setLoading, setError, setLastFetched, data.messages]
  );

  const loadMore = (page: number, topicId: string) => {
    fetchDashboardData({ page, topicId, append: true });
  };

  const hasMore = Boolean(data.pagination?.hasNextPage);

  // Auto-refresh silently every 2 minutes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (!lastFetched || now - lastFetched > 2 * 60 * 1000) {
        fetchDashboardData({ silent: true }); // silent refresh
      }
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, [user, lastFetched, fetchDashboardData]);

  return { data, loading, error, refetch: fetchDashboardData, loadMore, hasMore, loadingMore };
};
