import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

export const useDeleteMessage = () => {
  const { user } = useAuth();
  const [loadingDelete, setLoadingDelete] = useState(true);
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState("");

  const deleteMessage = async (messageId: string) => {
    if (!messageId) {
      setSuccess(false);
      setError("MessageId is required");
      return;
    }

    try {
      setLoadingDelete(true);
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
      setLoadingDelete(false);
      console.error("Failed to fetch message data:", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteMessage, loadingDelete, success, error };
};
