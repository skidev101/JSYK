import { useState, useEffect } from "react";
import axios from "axios";
import type { User as FirebaseUser } from "firebase/auth";
import toast from "react-hot-toast";

interface RecentLink {
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
  recentLinks: RecentLink[];
  messages: Message[];
}

export const useDashboardData = (user: FirebaseUser | null) => {
  const [data, setData] = useState<DashboardData>({
    recentLinks: [],
    messages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchdashboardData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const idToken = await user.getIdToken();

      const config = {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      };

      const [recentLinksRes, messagesRes] = await Promise.all([
        axios.get("http://127.0.0.1:3000/api/topic", config),
        axios.get("http://127.0.0.1:3000/api/messages?page=1&limit=20", config)
      ]);

      const topics = recentLinksRes.data.topics || [];
      const transformedTopics = topics.map((topic: any) => ({
        _id: topic._id,
        url: topic.topicLink,
        createdAt: topic.createdAt,
        topic: topic.topic
      }));

      setData({
        recentLinks: transformedTopics,
        messages: messagesRes.data.messages || []
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdashboardData();
  }, [user]);

  return { data, loading, error, refetch: fetchdashboardData };
};