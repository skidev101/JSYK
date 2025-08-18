import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "../shared/services/firebase/config";
import axios from "axios";

interface User {
  username: string;
  email: string;
  somethingLink: string;
  profileImgUrl?: string;
  bio?: string;
  profileViews: number;
  idToken: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            const idToken = await getIdToken(firebaseUser);
            console.log("AuthContext ID token gotten");

            const response = await axios.get("http://127.0.0.1:3000/api/auth", {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            });

            setUser({ ...response.data.data, idToken});
            setFirebaseUser(firebaseUser)
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
    <AuthContext.Provider value={{ user, firebaseUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("auth must be used within auth provider");
  return context;
};
