import { useState } from "react";
import toast from "react-hot-toast";
import type { SuccessfulUploadsProps } from "@/shared/utils/uploadImage";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";

interface createTopicProps {
  topic: string;
  themeColor: string;
  topicImgUrls?: SuccessfulUploadsProps[];
}

export const useCreateTopic = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const createTopic = async ({
    topic,
    themeColor,
    topicImgUrls,
  }: createTopicProps) => {
    setLoading(true);

    try {
      const response = await axiosPrivate.post("/topic", {
        topic,
        themeColor,
        topicImgUrls,
      });
      console.log("response from create topic:", response);
      return response;
      
    } catch (err: any) {
      console.log("error at useCreateTopic:", err);
      toast.error("An unknown error occured");
    } finally {
      setLoading(false);
    }
  };

  return { createTopic, loading };
};
