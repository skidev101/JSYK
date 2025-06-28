import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'
import {
   onAuthStateChanged,
   signOut, 
   getIdToken
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

interface User {
   username: string;
   email: string;
   jsykLink: string,
   profileImgUrl?: string;
   bio?: string;
   idToken?: string;
}

interface AuthContextType {
   user: User | null;
   login: (user : User) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   const login = (user: User) => {
      setUser(user);
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
         if (firebaseUser) {
            try {
               const idToken = await getIdToken(firebaseUser);

               const response = await axios.post('/api/auth/user', {}, {
                  headers: {
                     Authorization: `Bearer ${idToken}`
                  }
               });

               const userData: User = {
                  username: response.data.username,
                  email: response.data.email,
                  jsykLink: response.data.jsykLink,
                  profileImgUrl: response.data.profileImgUrl,
                  bio: response.data.bio,
                  idToken 
               };

               setUser(userData);


            } catch (error) {
               console.error('Error fetching user data:', error);
            }  
         } else {
            setUser(null);
         }
      })

      return () => unsubscribe();
   }, [])

   const logout = async () => {
      await signOut(auth)
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