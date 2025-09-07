import { APP_CONFIG } from "@/shared/constants/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    setLoading(true);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email, {
        url: `${APP_CONFIG.BASE_URL}/login`,
        handleCodeInApp: true,
      });

      return { success: true };
    } catch (err) {
      console.error("Forgot password error:", err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};
