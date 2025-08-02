import toast from "react-hot-toast";
import { APP_CONFIG } from "@/shared/constants/config";

export const copyToClipboard = async (path: string): Promise<boolean> => {
  try {
    const fullUrl = `${APP_CONFIG.BASE_URL}/${path}`;
    await navigator?.clipboard.writeText(fullUrl);
    toast.success("Link copied");
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    toast.error("Failed to copy");
    return false;
  }
};
