import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

export const useDeleteMessage = () => {
  const { user } = useAuth();
  const [loadingDelete, setLoadingDelete] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteMessage = async (messageId: string): Promise<boolean> => {
    if (!messageId) {
      setSuccess(false);
      setError("MessageId is required");
      return false;
    }

    try {
      setLoadingDelete(true);
      setError(null);

      const response = await axios.delete(
        `http://127.0.0.1:3000/api/message/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        return true;
      } else {
        setSuccess(false);
        return false;
      }
    } catch (err: any) {
      setError("Failed to delete message");
      setSuccess(false);
      console.error("Failed to fetch message data:", err);
      return false;
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteMessage, loadingDelete, success, error };
};
