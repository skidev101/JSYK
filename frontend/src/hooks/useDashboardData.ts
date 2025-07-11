import { useState, useEffect } from 'react';
import axios from 'axios'
import type { User } from "firebase/auth";


interface RecentLink {
   _id: string;
   url: string,
   createdAt: string,
   topic: string
}

interface Message {
   _id: string;
   topicId?: string;
   topicSlug?: string;
   topic?: string;
   content: string;
   isRead: boolean;
}

interface DashboardData {
   recentLinks: RecentLink[],
   messages: Message[]
}

export const useDashboardData = (user: User | null) => {
   const [data, setData] = useState<DashboardData>({
      recentLinks: [],
      messages: []
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const fetchdashboardData = async () => {
      if (!user) return;

         try {
            setLoading(true);
            setError(null);
            
            const idToken = await user.getIdToken()

            const config = {
               headers: {
                  'Authorization': `Bearer ${idToken}`
               }
            }

            const [recentLinksRes, messagesRes] = await Promise.all([
               axios.get('http://127.0.0.1/api/topic', config),
               axios.get('http://127.0.0.1/api/message', config)
            ])

            setData({
               recentLinks: recentLinksRes.data,
               messages: messagesRes.data
            })
         } catch (err) {

         } finally {
            setLoading(false)
         }
   }

   useEffect(() => {
      fetchdashboardData()
   }, [user]);

   return { data, loading, error, refetch: fetchdashboardData }
}
