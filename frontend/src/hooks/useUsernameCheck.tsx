import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsernameCheck = (username: string) => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
   if (!username.trim()) return setIsAvailable(null);

   const delay = setTimeout(async () => {
      setLoading(true);
      try {
         const response = await axios.get('http://127.0.0.1:3000/api/auth/check-username', {
            params: { username }
         });
      
         setIsAvailable(response.data.available);
      } catch (error) {
         console.error('Error checking username:', error);
         setIsAvailable(null);
      } finally {
         setLoading(false);
      }
   }, 500);

   return () => clearTimeout(delay);
  }, [username]);

   return { isAvailable, loading };
}

        

  
