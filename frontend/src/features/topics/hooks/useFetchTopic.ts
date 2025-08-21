// import { useAuth } from "@/context/AuthContext";
// import axios from "axios";
// import { useState } from "react";

// interface FetchProps {
//     topicId: string;
//     page: number;
//     limit: number;
// }

// export const useFetchTopic = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<boolean | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const fetchTopic = async ({ topicId, page, limit }: FetchProps) => {
//     if (!topicId) {
//       setSuccess(false);
//       setError("MessageId is required");
//       return ;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//     //   const response = await axios.get(
//     //     `http://127.0.0.1:3000/api/topic/${topicId}`,
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${user?.idToken}`,
//     //       },
//     //     }
//     //   );

//     const config = {
//         headers: {
//         Authorization: `Bearer ${user?.idToken}`,
//         },
//     };

//     const [topicsRes, messagesRes] = await Promise.all([
//         axios.get(`http://127.0.0.1:3000/api/topic/${topicId}`, config),
//         axios.get(`http://127.0.0.1:3000/api/message?page=${page}&limit=${limit}&topicId=${topicId}`, config)
//     ]);

//     const topicInfo = topicsRes.data.data;
//     const topicMessages = messagesRes.data.data;

//     } catch (err: any) {
//       setError("Failed to delete message");
//       setSuccess(false);
//       console.error("Failed to fetch message data:", err);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fetchTopic, topicInfo, topicMessages, loading, success, error };
// };
