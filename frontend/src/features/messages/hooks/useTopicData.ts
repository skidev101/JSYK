import axios from "axios";
import { useEffect, useState } from "react";

interface TopicDataProps {
  username: string;
  profileImgUrl: string;
  topic: string;
  topicImgUrls?: string[];
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
        const url = topicId? `http://127.0.0.1:3000/api/topic/${profileSlug}/${topicId}` : `http://127.0.0.1:3000/api/profile/${profileSlug}`
        const response = await axios.get(url);

        if (isMounted) {
          setData(response.data.data)
        }
      } catch (err: any) {
        if (isMounted) {
          setTopicError(err.response?.data?.message || "Failed to fetch topic data");
          setLoadingTopic(false);
        }
        console.error("Failed to fetch topic data:", err)
      } finally {
        if (isMounted) setLoadingTopic(false);
      }
    };

    fetchTopicData();

    return (() => {
      isMounted = false;
    });

 }, [profileSlug, topicId]);
    
  return { data, loadingTopic, topicError };
};
