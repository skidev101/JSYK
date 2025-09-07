import { useState } from "react";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import toast from "react-hot-toast";

export const useDeleteAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAccount = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await axiosPrivate.delete("/profile");
      return true;
    } catch (err: any) {
      console.error("Delete account failed:", err);
      const message = err?.response?.data?.message || "Failed to delete account.";
      toast.error(message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
};
