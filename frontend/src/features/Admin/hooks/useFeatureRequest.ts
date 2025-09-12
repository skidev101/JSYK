import { useAuth } from "@/context/AuthContext";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

export interface FeatureRequest {
  _id: string;
  uid: string;
  username: string;
  content: string;
  email: string;
  createdAt: string;
}

export const useFeatureRequest = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FeatureRequest[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const getFeatureRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosPrivate.get(`/feature`);
        isMounted && setData(response.data.featureRequests);
      } catch (err: any) {
        setError("Failed to fetch requests");
        console.error("Failed to fetch feature requests:", err);
      } finally {
        setLoading(false);
      }
    };

    getFeatureRequests();

    return () => {
        isMounted = false
    }
  }, [user]);

  return { data, loading, error };
};
