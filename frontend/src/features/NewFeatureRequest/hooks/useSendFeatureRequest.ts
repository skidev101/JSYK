import { useAuth } from "@/context/AuthContext";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useState } from "react";

export const useSendFeatureRequest = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendFeatureRequest = async (message: string): Promise<boolean> => {
    if (!user || !message) {
      setSuccess(false);
      setError("Message content is required");
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.post(`/feature`, {
        content: message,
        username: user?.username
      });

      if (response.data.success) {
        setSuccess(true);
        return true;
      } else {
        setSuccess(false);
        return false;
      }
    } catch (err: any) {
      setError("Failed to send request");
      setSuccess(false);
      console.error("Failed to fetch message data:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendFeatureRequest, loading, success, error };
};
