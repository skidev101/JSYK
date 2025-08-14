import UserProfile from "../Userprofile";
import MessageCard from "../MessageCard";
// import ProfileDrawer from "../ProfileDrawer";
// import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { groupTopicsByDate } from "@/shared/utils/groupTopicsByDate";
import RecentTopicLinks from "../RecentTopicLinks";
// import { HashLoader } from "react-spinners";
import { UI_CONSTANTS } from "@/shared/constants/ui.constants";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { useEffect } from "react";

const Dashboard = () => {
  // const { loading } = useAuth();
  const { data, error, refetch } = useDashboardData();
  const messages = data.messages;
  useEffect(() => {
    // Only fetch if no data yet
    if (!data.messages.length) {
      refetch();
    }
  }, []);

  const lastFiveTopics = [...data.topics]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const groupedTopics = groupTopicsByDate(lastFiveTopics);
  const navigate = useNavigate();

  // if (!user) return;

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[100vh] p-8">
  //       <HashLoader size={40} color="#000" />
  //       {/* <div className="text-lg">Loading dashboard...</div> */}
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <ErrorState
        message="An unknown error occured"
        src="/empty-box.png"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="bg-gray-200 mt-20 flex flex-col md:flex-row gap-3 p-2 sm:p-4 rounded-md">
      <div className="flex flex-col gap-2">
        <UserProfile onCreateWithTopic={() => navigate("/new-topic")} />

        <RecentTopicLinks groupedTopicLinks={groupedTopics} />
      </div>

      <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4">
        <div className="flex items-center gap-1 mt-2 ml-1">
          <MessageCircle size={UI_CONSTANTS.ICON_SIZES.LARGE} />
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
