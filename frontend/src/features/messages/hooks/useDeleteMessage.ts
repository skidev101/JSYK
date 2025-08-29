import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useState } from "react";

export const useDeleteMessage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loadingDelete, setLoadingDelete] = useState(false);
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

      const response = await axiosPrivate.delete(`message/${messageId}`);

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
