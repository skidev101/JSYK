import axios from "@/api/axios";
import { useEffect, useState } from "react";

interface TopicImage {
  url: string;
  publicId: string;
  expiresAt: string;
  _id: string;
}

interface TopicDataProps {
  username: string;
  profileImgUrl: string;
  topic: string;
  topicImgUrls?: TopicImage[];
  themeColor: string;
}

export const useTopicData = (profileSlug?: string, topicId?: string) => {
  const [data, setData] = useState<TopicDataProps | null>();
  const [loadingTopic, setLoadingTopic] = useState<boolean>(false);
  const [topicError, setTopicError] = useState<string | null>(null);

  useEffect(() => {
    if (!profileSlug) return;

    let isMounted = true;

    const fetchTopicData = async () => {
      try {
        setLoadingTopic(true);
        const url = topicId
          ? `topic/${profileSlug}/${topicId}`
          : `/profile/${profileSlug}`;
        const response = await axios.get(url);
        console.log("topic details:", response);

        if (isMounted) {
          setData(response.data.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setTopicError(
            err.response?.data?.message || "Failed to fetch topic data"
          );
          setLoadingTopic(false);
        }
        console.error("Failed to fetch topic data:", err);
      } finally {
        if (isMounted) setLoadingTopic(false);
      }
    };

    fetchTopicData();

    return () => {
      isMounted = false;
    };
  }, [profileSlug, topicId]);

  return { data, loadingTopic, topicError };
};
