import { axiosPrivate } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { user, firebaseUser, updateToken } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.idToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevReq.sent) {
          prevReq.sent = true;

          try {
            if (!firebaseUser) {
              throw new Error("No authenticated user available");
            }

            const newIdToken = await firebaseUser.getIdToken(true);
            updateToken(newIdToken);
            prevReq.headers["Authorization"] = `Bearer ${newIdToken}`;

            return axiosPrivate(prevReq);
          } catch (refreshError) {
            // Handle token refresh failure 
            console.error("Token refresh failed:", refreshError);
            // signOut(); // Clear auth state
            return Promise.reject(refreshError);
          }
          
          
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, firebaseUser, updateToken]);

  return axiosPrivate;
};


