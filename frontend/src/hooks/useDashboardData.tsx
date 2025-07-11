import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
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

const useDashboardData = (user: User) => {
   if (!user) return;

   const [data, setData] = useState<DashboardData>({
      recentLinks: [],
      messages: []
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchMessages = async () => {
         try {
            setLoading(true);
            setError(null);

            const idToken = user.idToken;

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

         }
      }
   }, [])
}