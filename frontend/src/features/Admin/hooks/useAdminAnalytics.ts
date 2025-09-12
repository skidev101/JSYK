import { useEffect, useState } from "react";
import { useAxiosPrivate } from "@/shared/hooks/useAxiosPrivate";


interface Analytics {
  users: {
    total: number;
    today: number;
    yesterday: number;
    perDay?: { _id: string; count: number }[];
  };
  topics: {
    total: number;
    today: number;
    yesterday: number;
    top?: { topic: string; messageCount: number }[];
  };
  messages: {
    total: number;
    today: number;
    yesterday: number;
    unread: number;
    perDay?: { _id: string; count: number }[];
  };
  cloudinary: {
    storage: {
      usage: string; 
      limit: string; 
    };
    bandwidth: {
      usage: string; 
      limit: string; 
    };
    requests: number;
    transformations: number;
  };
}

export const useAdminAnalytics = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axiosPrivate.get("/admin/analytics");
        console.log("cloudinary usage analytics:", res)
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError("Failed to load analytics");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
