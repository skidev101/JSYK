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
import { FadeDown } from "@/shared/components/Motion";
import Card from "@/shared/components/Card";
import { copyToClipboard } from "@/shared/utils/clipboard";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { data, error, refetch, loadMore, loadingData } = useDashboardData();
  const messages = data.messages;

  // const [showEmojiExplosion, setShowEmojiExplosion] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   setShowEmojiExplosion(true);

  //   return (() => setShowEmojiExplosion(false))
  // }, [])

  useEffect(() => {
    if (!data.messages.length) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !loadingData &&
          data.pagination?.hasNextPage
        ) {
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
    <FadeDown>
      <div className="mt-16 mb-8 flex flex-col md:flex-row gap-3 p-2 sm:p-4 rounded-md bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="flex flex-col gap-2 pt-2">
          <UserProfile />

          <RecentTopicLinks groupedTopicLinks={groupedTopics} />
        </div>

        <div className="flex flex-col bg-white w-full max-h-max rounded-xl p-2 sm:p-4 shadow">
          <div className="flex items-center gap-1 py-2 ml-1">
            <MessageCircle size={20} />
            <h1 className="text-lg sm:text-xl rounded-xl">Messages</h1>
          </div>

          {messages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 p-2 sm:p-4 bg-gray-200 rounded-xl sm:max-h-[100vh] sm:overflow-y-auto">
              {messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message.content}
                  messageId={message._id}
                  topic={message.topic}
                  isRead={message.isRead}
                  themeColor={message.themeColor}
                  inDashboard={true}
                />
              ))}
              <div
                ref={loaderRef}
                className="flex justify-center items-center p-4"
              >
                {loadingData && (
                  <Loader2 size={25} className="animate-spin text-blue-500" />
                )}
                {!data.pagination?.hasNextPage && !loadingData && (
                  <span className="text-sm text-gray-500">
                    No more messages
                  </span>
                )}
              </div>
            </div>
          )}

          {!messages.length && (
            <div className="px-2 py-1">

            <Card>
              <div className="flex flex-col items-center justify-center text-center px-8 py-4">
                <img
                  src="/box.png"
                  alt="No links"
                  className="w-36 h-36 mb-4 opacity-80"
                />
                <h2 className="text-lg font-semibold text-gray-700">
                  No messages yet
                </h2>
                <p className="text-sm text-gray-500 max-w-xs mt-2">
                  Share your anonymous link to get started
                </p>
                <button
                  onClick={() => copyToClipboard(`m/${user?.jsykLink}`)}
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
                >
                  Copy link
                </button>
              </div>
            </Card>
            </div>
          )}
        </div>
      </div>

      {/* Emoji Explosion
      {showEmojiExplosion && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {["💬", "🎉", "✨", "👻", "🔥", "💫", "🚀", "💝", "🌟", "🎊", "💭", "⚡"].map((emoji, index) => (
            <div
              key={index}
              className="absolute text-4xl emoji-explosion"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )} */}
    </FadeDown>
  );
};

export default Dashboard;
