import { useEffect, useRef, useState } from "react";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import MessageCard from "@/features/dashboard/components/MessageCard";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { Loader2 } from "lucide-react";

const TopicMessagesList = () => {
  const { data, refetch, loadMore, error, loadingData } = useDashboardData();
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 🔹 When data changes (from backend), append it to local state
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setMessages((prev) => [...prev, ...data]);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loadingData) {
          const nextPage = page + 1;
          loadMore(nextPage, ""); // fetch next page
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
  }, [page, loadingData, loadMore]);

  if (error) {
    return (
      <ErrorState
        message="An unknown error occurred"
        src="/empty-box.png"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="flex items-center w-full flex-col">
      <div className="w-full max-w-3xl ">
        <div className="flex justify-between items-center w-full px-2 mt-20">
          <h1 className="text-lg sm:text-2xl bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-200">
            Hello world
          </h1>
        </div>
        <div className="w-full rounded-2xl p-4 border-1 border-gray-100 shadow-md mt-5">
          <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 p-2 sm:p-4 bg-gray-200 rounded-xl sm:max-h-[100vh] sm:overflow-y-auto">
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
              <div ref={loaderRef} className="fixed left-1/2 -translate-x-1/2 pt-1">
                {loadingData && (
                  <Loader2 size={15} className="animate-spin text-blue-500" />
                )}
                {!data && !loadingData && (
                  <span className="text-sm text-gray-700">No more messages</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicMessagesList;
