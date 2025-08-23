import { axiosPrivate } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const useAxiosPrivate = () => {
  const { user, firebaseUser } = useAuth();
  if (!user) throw new Error("No firebase user yet");

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.idToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq.sent) {
          prevReq.sent = true;

          let newIdToken;
          if (firebaseUser) {
            newIdToken = await firebaseUser.getIdToken();
          } else {
            throw new Error("No firebaseUser");
          }

          prevReq.headers["Authorization"] = `Bearer ${newIdToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, firebaseUser]);

  return axiosPrivate;
};


