import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";

interface fetchOptions {
  topicId?: string;
  page?: number;
  limit?: number;
  append?: boolean;
  silent?: boolean;
}

export const useDashboardData = () => {
  // console.log("now fetching dashboard data");
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {
    data,
    setData,
    loadingData,
    error,
    lastFetched,
    setLoadingData,
    setError,
    setLastFetched,
  } = useDashboardStore();

  const fetchDashboardData = useCallback(
    async (options: fetchOptions = {}) => {
      if (!user || !user.idToken) {
        setLoadingData(false);
        console.log("leaving function because no user yet");
        return;
      }

      const {
        topicId = "",
        page = 1,
        limit = 20,
        append = false,
        silent = false,
      } = options;

      try {
        if (!silent) {
          setLoadingData(true);
        }
        setError(null);

        const [topicsRes, messagesRes] = await Promise.all([
          axiosPrivate.get("/topic"),
          axiosPrivate.get(
            `/message?page=${page}&limit=${limit}${
              topicId ? `&topic=${topicId}` : ""
            }`
          ),
        ]);

        const topics = topicsRes.data.topics || [];
        
        console.log("topics gotten from server:", topics);
        const transformedTopics = topics.map((topic: any) => ({
          _id: topic._id,
          topicId: topic.topicId,
          url: topic.topicLink,
          createdAt: topic.createdAt,
          topic: topic.topic,
          messageCount: topic.messageCount
        }));

        const newMessages = messagesRes.data.messages || [];
        console.log("newMessages from server:", newMessages);

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
        if (!silent) setLoadingData(false);
      }
    },
    [user, setData, setLoadingData, setError, setLastFetched]
  );

  const loadMore = useCallback(
    (page: number, topicId: string) => {
      fetchDashboardData({ page, topicId, append: true });
    },
    [fetchDashboardData]
  );

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  // Auto-refresh silently every 2 minutes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (!lastFetched || now - lastFetched > 2 * 60 * 1000) {
        fetchDashboardData({ silent: true }); // silent refresh
        console.log("running silent dasboard data fetch");
      }
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, [user, lastFetched, fetchDashboardData]);

  return { data, loadingData, error, refetch: fetchDashboardData, loadMore };
};
