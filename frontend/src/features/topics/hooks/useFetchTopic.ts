import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

interface TopicImage {
  _id: string;
  expiresAt: string;
  publicId: string;
  url: string;
}

export interface TopicDetails {
  topic: string;
  topicLink: string;
  themeColor: string;
  topicImgUrls: TopicImage[];
  createdAt: string;
  messageCount: number;
  hadImages: boolean;
}

export const useFetchTopic = (topicId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const [topicDetails, setTopicDetails] = useState<TopicDetails | null>(null);

  useEffect(() => {
    if (!topicId) return;

    let isMounted = true;

    const fetchTopic = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosPrivate.get(`/topic/${topicId}`);
        console.log("topic res:", response)
        isMounted && setTopicDetails(response.data.data);
      } catch (err: any) {
        console.error("Failed to fetch topic data:", err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchTopic();

    return () => {
      isMounted = false;
    };
  }, [topicId, axiosPrivate]);

  return { topicDetails, loading, error };
};
