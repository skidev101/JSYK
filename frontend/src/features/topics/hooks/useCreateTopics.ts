import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { APP_CONFIG } from "@/shared/constants/config";
import type { SuccessfulUploadsProps } from "@/shared/utils/uploadImage";

interface createTopicProps {
  topic: string;
  themeColor: string;
  topicImgUrls?: SuccessfulUploadsProps[];
}

export const useCreateTopic = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createTopic = async ({ topic, themeColor, topicImgUrls }: createTopicProps) => {

    try {
      setLoading(true);
      const response = await axios.post(
        `${APP_CONFIG.API}/topic`,
        {
          topic,
          themeColor,
          topicImgUrls
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.idToken}`,
          },
        }
      );
      setLoading(false);
      console.log("response from create topic:", response)
      return response
    } catch (err: any) {
      const error = err as AxiosError;
      console.log("error at useCreateTopic:", error);
      toast.error("An unknown error occured:", err.message);
    }
  }

  return { createTopic, loading }

};
