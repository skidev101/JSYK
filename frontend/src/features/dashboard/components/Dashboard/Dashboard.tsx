import Card from "@/shared/components/Card/Card";
import UserProfile from "../Userprofile";
import MessageCard from "../MessageCard";
// import ProfileDrawer from "../ProfileDrawer";
import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useDashboardData();
  const messages = data.messages;

  if (!user) return;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
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
    <div className="mt-20 flex flex-col sm:flex-row gap-2">
      <Card>
        <UserProfile user={user} />
      </Card>
      <Card>
         <h1>Messages</h1>
        {messages.map((message) => (
            <MessageCard 
               message={message.content}
               messageId={message._id}
               isRead={message.isRead}
            />
        ))}
      </Card>
    </div>
  );
};

export default Dashboard;
