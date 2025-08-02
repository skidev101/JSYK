import UserProfile from "../Userprofile";
import MessageCard from "../MessageCard";
// import ProfileDrawer from "../ProfileDrawer";
import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useDashboardData();
  const messages = data.messages;
  const navigate = useNavigate();

  // if (!user) return;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg mt-20">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 mt-20">
        <div className="text-lg">An error occured</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 mt-60 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 mt-20 flex flex-col md:flex-row gap-3 p-2 sm:p-4 rounded-md">
      <UserProfile 
        user={user} 
        onCreateWithTopic={() => navigate('/new-topic')}
      />

      <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4">
        <div className="flex items-center gap-1 mt-2 ml-1">
          <MessageCircle size={20} />
          <h1 className="text-lg sm:text-xl rounded-xl">Messages</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 p-2 sm:p-4 bg-gray-200 rounded-xl sm:max-h-[100vh] sm:overflow-y-auto">
          {messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message.content}
              messageId={message._id}
              isRead={message.isRead}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
