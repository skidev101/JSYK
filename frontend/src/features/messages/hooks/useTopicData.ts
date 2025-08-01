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
  if (!profileSlug) return;
  const [data, setData] = useState<TopicDataProps | null>();
  let isMounted = true;

  const fetchTopicData = async () => {
      if (topicId) {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/topic/${profileSlug}/${topicId}`
        );
        isMounted && setData(response.data.data);
      } else {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/profile/${profileSlug}`
        );
        isMounted && setData(response.data.data);
      }
  }

  useEffect(() => {
    isMounted && fetchTopicData();
    return () => {
      isMounted = false;
    }
  }, [profileSlug, topicId]);

  return { data }
};
