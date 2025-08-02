import axios from "axios";
import { useState } from "react";

interface sendMessageProps {
  profileSlug: string;
  topicId?: string;
  messageToSend: string;
}

export const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const sendMessage = async ({
    profileSlug,
    topicId,
    messageToSend,
  }: sendMessageProps) => {
    if (!messageToSend.trim()) {
      setError("Message cannot be empty");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("http://127.0.0.1:3000/api/message", {
        profileSlug,
        topicId,
        content: messageToSend,
      });

      setSuccess(true);
    } catch (err: any) {
      console.log("Error sending message:", err);
      setError("An error occured");
      setSuccess(false);
      if (err.response?.status === 429) {
        setError("Yo... slow down a bit");
        setSuccess(false);
      } else {
        setError("An error occured😔. Please try again");
        setSuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading, success, error };
};
