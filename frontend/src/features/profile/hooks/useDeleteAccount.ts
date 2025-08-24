import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useDeleteAccount = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }
    try {
      await axiosPrivate.delete("/profile");
      navigate("/");
    } catch (err: any) {
      console.error("Delete account failed:", err);
      toast("Failed to delete account.");
    }
  };

  return deleteAccount;
};
