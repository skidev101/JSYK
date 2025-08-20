import axios from "axios";

export const useDeleteTopic = () => {
  const handleDelete = async (topicId: string) => {
    try {
      await axios.delete(`http://127.0.0.1/api/topic/${topicId}`);
    } catch (err) {
      console.error("Failed to delete topic:", err);
    }
  };

  return { handleDelete };
};
