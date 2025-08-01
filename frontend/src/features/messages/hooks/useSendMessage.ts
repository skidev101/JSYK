import axios from "axios";
import { useState } from "react";

interface sendMessageProps {
    profileSlug: string;
    topicId?: string;
    messageToSend: string;
}

export const handleSendMessage = async ({ profileSlug, topicId, messageToSend }: sendMessageProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    if (!messageToSend.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:3000/api/message", {
        profileSlug,
        topicId,
        content: messageToSend,
      });

      setMessage("Message sent successfully")
    } catch (err: any) {
      console.log("Error sending message:", err);
      setError("An error occured");
      if (err.code === 429) {
        setError("Yo... slow down a bit");
      } else {
        setError("An error occured😔. Please try again");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }

    return { message, loading, error }
  };
