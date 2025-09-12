import axios from "@/api/axios";
import { useState } from "react";

interface sendMessageProps {
  profileSlug: string;
  topicId?: string;
  messageToSend: string;
  themeColor?: string;
}

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const sendMessage = async ({
    profileSlug,
    topicId,
    messageToSend,
    themeColor,
  }: sendMessageProps): Promise<Boolean> => {
    if (!messageToSend.trim()) {
      setError("Message cannot be empty");
      setSuccess(false);
      return false;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/message", {
        profileSlug,
        topicId,
        content: messageToSend,
        themeColor,
      });

      if (response.data.success) {
        setSuccess(true);
        return true;
      } else {
        setSuccess(true);
        return true;
      }

      
    } catch (err: any) {
      console.log("Error sending message:", err);
      setError("An error occured");
      setSuccess(false);
      if (err.response?.status === 429) {
        setError("Yo... slow down a bit");
        setSuccess(false);
      } else {
        setError("An error occured. Please try again");
        setSuccess(false);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading, success, error };
};
