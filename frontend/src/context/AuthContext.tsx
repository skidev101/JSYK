import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "../shared/services/firebase/config";
import axios from "axios";
import { APP_CONFIG } from "@/shared/constants/config";

interface User {
  username: string;
  email: string;
  jsykLink: string;
  profileImgUrl?: string;
  bio?: string;
  profileViews: number;
  idToken: string;
  roles: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateToken: (newToken: string) => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: User) => {
    setUser(user);
  };

  const updateToken = (newToken: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, idToken: newToken };
      }
      return prevUser;
    });
  };

  const refetchUser = async () => {
    if (!firebaseUser) return;

    try {
      setLoading(true);
      const idToken = await firebaseUser.getIdToken(true);
      const response = await axios.get(`${APP_CONFIG.API_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setUser({ ...response.data.data, idToken });
    } catch (err) {
      console.error("Error refreshing user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            const idToken = await getIdToken(firebaseUser);
            console.log("AuthContext ID token gotten");

            const response = await axios.get(
              `${APP_CONFIG.API_BASE_URL}/auth`,
              {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              }
            );

            setUser({ ...response.data.data, idToken });
            setFirebaseUser(firebaseUser);
            console.log("user from server:", response.data.data);
          } catch (err: any) {
            console.error("Error fetching user data:", err);
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        logout,
        updateToken,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("auth must be used within auth provider");
  return context;
};
