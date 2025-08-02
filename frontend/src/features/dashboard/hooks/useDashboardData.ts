import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export interface Topic {
  _id: string;
  url: string;
  createdAt: string;
  topic: string;
}

interface Message {
  _id: string;
  topicId?: string;
  topicSlug?: string;
  topic?: string;
  content: string;
  isRead: boolean;
}

interface DashboardData {
  topics: Topic[];
  messages: Message[];
  pagination: string;
  unreadCount: string;
}

interface fetchOptions {
  topicId?: string;
  page?: number;
  limit?: number;
  append?: boolean;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData>({
    topics: [],
    messages: [],
    pagination: "",
    unreadCount: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(
    async (options: fetchOptions = {}) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { topicId = "", page = 1, limit = 20, append = false } = options;

      try {
        setLoading(true);
        setError(null);

        const config = {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        };

        const [topicsRes, messagesRes] = await Promise.all([
          axios.get("http://127.0.0.1:3000/api/topic", config),
          axios.get(
            `http://127.0.0.1:3000/api/message?page=${page}&limit=${limit}${
              topicId ? `&topic=${topicId}` : ""
            }`,
            config
          ),
        ]);

        const topics = topicsRes.data.topics || [];''
        const transformedTopics = topics.map((topic: any) => ({
          _id: topic._id,
          url: topic.topicLink,
          createdAt: topic.createdAt,
          topic: topic.topic,
        }));

        const newMessages = messagesRes.data.messages || [];

        setData((prev) => ({
          topics: transformedTopics,
          messages: append ? [...prev.messages, ...newMessages] : newMessages,
          unreadCount: messagesRes.data.unreadCount || 0,
          pagination: messagesRes.data.pagination || "",
        }));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    let isMounted = true;
    if (user && isMounted) fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, [user, fetchDashboardData]);

  const loadMore = (page: number, topicId: string) => { 
    fetchDashboardData({ page, topicId, append: true });
  };

  return { data, loading, error, refetch: fetchDashboardData, loadMore };
};
