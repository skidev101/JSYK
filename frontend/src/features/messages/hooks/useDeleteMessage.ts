import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

export const useDeleteMessage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState("");

  const deleteMessage = async (messageId: string) => {
    if (!messageId) {
      setSuccess(false);
      setError("MessageId is required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:3000/api/message/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        }
      );

      if (response.data.success) setSuccess(true);
    } catch (err: any) {
      setError("Failed to delete message");
      setLoading(false);
      console.error("Failed to fetch message data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading, success, error };
};
