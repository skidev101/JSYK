import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useState } from "react";

export const useDeleteTopic = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async (topicId: string) => {

    try {
      setLoadingDelete(true);
      const res = await axiosPrivate.delete(`/topic/${topicId}`);
      if (res.data.success) {
        return true;
      }
    } catch (err) {
      console.error("Failed to delete topic:", err);
      setLoadingDelete(false);
      return false;
    }
  };

  return { handleDelete, loadingDelete };
};
