import axios from "@/api/axios";
import { useEffect, useState } from "react";

interface UserProfileData {
  username: string;
  profileImgUrl?: string;
  somethingLink: string;
  bio?: string;
  profileSlug: string;
}

export const useFetchUserProfile = (profileSlug: string) => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (!profileSlug) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/profile/${profileSlug}`
        );
        isMounted && setUserProfile(response.data.data);

      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to fetch topic data");
          setLoading(false);
        }
        console.error("Failed to fetch topic data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [profileSlug]);

  return { userProfile, loading, error };
};
