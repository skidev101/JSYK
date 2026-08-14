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
      <div className="min-h-[calc(100vh-70px)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#d9dcd4] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#275d49]">Your private workspace</p>
            <h1 className="text-4xl font-semibold leading-none tracking-[-0.06em] text-[#1f2421] sm:text-5xl">Good messages start here.</h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#707871]">Keep your link in the world. Keep the replies in this room.</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="grid min-w-0 gap-5">
          <UserProfile />

          <RecentTopicLinks groupedTopicLinks={groupedTopics} />
        </aside>

        <section className="min-w-0 border border-[#d9dcd4] bg-[#fffefa] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-[#d9dcd4] pb-4">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-[#e86b3c]" />
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Latest messages</h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#8b938c]">{messages.length} total</span>
          </div>

          {messages.length > 0 && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                className="col-span-full flex min-h-10 items-center justify-center p-2"
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
            <div className="flex min-h-[360px] items-center justify-center border border-dashed border-[#cdd2ca] bg-[#f8f7f2] px-6 py-12 text-center">
                <div className="flex max-w-xs flex-col items-center">
                  <span className="mb-5 grid h-12 w-12 place-items-center border border-[#d9dcd4] bg-[#fffefa] text-[#e86b3c]">
                    <MessageCircle size={21} />
                  </span>
                  <h2 className="text-lg font-semibold tracking-[-0.03em]">No messages yet</h2>
                  <p className="mt-2 text-sm leading-6 text-[#707871]">Share your anonymous link to open your inbox.</p>
                  <button
                    onClick={() => copyToClipboard(`m/${user?.jsykLink}`)}
                    className="mt-6 inline-flex h-10 items-center justify-center gap-2 bg-[#275d49] px-4 text-xs font-semibold text-white transition hover:bg-[#1d4435] active:translate-y-px"
                  >
                    Copy link
                  </button>
                </div>
            </div>
          )}
        </section>
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
