import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'

type User = {
   username: string;
   email: string;
   jsykLink: string,
   profileImgUrl?: string;
   bio?: string;
}

type AuthContextType = {
   user: User | null;
   login: (user : User) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   const login = (userData: User) => {
      setUser(userData);
   }

   const logout = () => {
      setUser(null)
   }

   return(
      <AuthContext.Provider value={{ user, login, logout}}>
         {children}
      </AuthContext.Provider>
   );
};


export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) throw new Error('auth must be used within auth provider');
   return context;
}