import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

interface TopicImage {
  _id: string;
  expiresAt: string;
  publicId: string;
  url: string;
}

interface TopicDetails {
  topic: string;
  topicLink: string;
  themeColor: string;
  topicImgUrls: TopicImage[];
  createdAt: string;
  messageCount: number;
}

export const useFetchTopic = (topicId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const [topicDetails, setTopicDetails] = useState<TopicDetails | null>(null);

  useEffect(() => {
    if (!topicId) return;

    const controller = new AbortController();

    const fetchTopic = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosPrivate.get(`/topic/${topicId}`, {
          signal: controller.signal,
        });
        setTopicDetails(response.data.data);
      } catch (err: any) {
        if (err.name === "CancelledError") return;
        console.error("Failed to fetch topic data:", err);
        return false;
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();

    return () => controller.abort();
  }, [topicId, axiosPrivate]);

  return { topicDetails, loading, error };
};
