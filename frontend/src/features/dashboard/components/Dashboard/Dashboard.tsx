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
import OpenBoxIcon from "@/shared/components/UI/OpenBoxIcon";

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
      <div className="workspace-page">
        <div className="workspace-heading">
          <div><p className="workspace-kicker">Your private workspace</p><h1>Good messages<br />start here.</h1></div>
          <p>Keep your link in the world. Keep the replies in this room.</p>
        </div>
        <div className="workspace-grid">
        <div className="workspace-sidebar">
          <UserProfile />

          <RecentTopicLinks groupedTopicLinks={groupedTopics} />
        </div>

        <div className="message-panel workspace-panel">
          <div className="message-panel-header">
            <MessageCircle size={20} />
            <h2>Latest messages</h2>
          </div>

          {messages.length > 0 && (
            <div className="message-grid-wrap"><div className="message-grid">
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
                className="flex justify-center items-center p-4 col-span-full"
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
              </div></div>
          )}

          {!messages.length && (
            <div className="empty-state">
              <Card>
                <div>
                  <OpenBoxIcon size={120} />

                  <h2>
                    No messages yet
                  </h2>
                  <p>
                    Share your anonymous link to get started
                  </p>
                  <button
                    onClick={() => copyToClipboard(`m/${user?.jsykLink}`)}
                    className="app-primary-button"
                  >
                    Copy link
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>
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
