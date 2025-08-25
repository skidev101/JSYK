import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useState } from "react";

export const useDeleteTopic = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async (topicId: string) => {
    setLoadingDelete(true);

    try {
      const res = await axiosPrivate.delete(`http://127.0.0.1/api/topic/${topicId}`);
      if (res.status === 200) {
        return true
      }
    } catch (err) {
      console.error("Failed to delete topic:", err);
      setLoadingDelete(false);
      return false
    }
  };

  return { handleDelete, loadingDelete };
};
