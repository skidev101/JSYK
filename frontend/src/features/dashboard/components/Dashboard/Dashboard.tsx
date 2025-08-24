import UserProfile from "../Userprofile";
import MessageCard from "../MessageCard";
import { useDashboardData } from "../../hooks/useDashboardData";
import { Loader2, MessageCircle } from "lucide-react";
import { groupTopicsByDate } from "@/shared/utils/groupTopicsByDate";
import RecentTopicLinks from "../RecentTopicLinks";
import { HashLoader } from "react-spinners";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, loading } = useAuth();  
  const { data, error, refetch, loadMore, loadingData } = useDashboardData();
  const messages = data.messages;

  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  

  useEffect(() => {
    if (!data.messages.length) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loadingData && data.pagination?.hasNextPage) {
          const nextPage = page + 1;
          loadMore(nextPage, "");
          setPage(nextPage);
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [page, loadingData]);

  const lastFiveTopics = [...data.topics]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const groupedTopics = groupTopicsByDate(lastFiveTopics);

  // if (!user) return;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] p-8">
        <HashLoader size={40} color="#000" />
        {/* <div className="text-lg">Loading dashboard...</div> */}
      </div>
    );
  }

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
        <UserProfile />

        <RecentTopicLinks groupedTopicLinks={groupedTopics} />
      </div>

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
              topic={message.topic}
              isRead={message.isRead}
              themeColor={message.themeColor}
            />
          ))}
        <div ref={loaderRef} className="flex justify-center p-4">
          {loadingData && (
            <Loader2 size={15} className="animate-spin block text-center" />
          )}
          {!data.pagination?.hasNextPage && (
            <span className="text-sm text-gray-700">No more messages</span>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
