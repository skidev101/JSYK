import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import toast from "react-hot-toast";

export const useDeleteAccount = () => {
    const axiosPrivate = useAxiosPrivate();

  const deleteAccount = async () => {
    try {
      await axiosPrivate.delete("/profile");
      return true
    } catch (err: any) {
      console.error("Delete account failed:", err);
      toast("Failed to delete account.");
      return false
    }
  };

  return deleteAccount;
};
