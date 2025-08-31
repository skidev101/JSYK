import { useEffect, useRef, useState } from "react";
import MessageCard from "@/features/dashboard/components/MessageCard";
// import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { Loader2, Trash } from "lucide-react";
import { useTopicMessages } from "../../hooks/useTopicMessages";
import { FadeDown } from "@/shared/components/Motion";
import { useDeleteTopic } from "../../hooks/useDeleteTopic";
import { useNavigate, useParams } from "react-router-dom";
import ActionModal from "@/shared/components/UI/Modals/Action/ActionModal";

const TopicMessagesList = () => {
  const { topicId } = useParams();
  console.log("topicId at useTopicMessages hook:", topicId);
  const navigate = useNavigate();

  const { messages, pagination, loadMore, error, loading, fetchTopicMessages } =
    useTopicMessages();
  const { handleDelete, loadingDelete } = useDeleteTopic();

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (topicId) {
      fetchTopicMessages({ page: 1, topicId });
    }
  }, [fetchTopicMessages, topicId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && pagination?.hasNextPage) {
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
  }, [page, loading, pagination, loadMore]);

  const deleteTopic = async () => {
    if (!topicId) return;

    const success = await handleDelete(topicId);
    if (success) {
      setIsModalOpen(false);
      navigate("/dashboard");
    }
  };

  if (error) {
    console.log("hello world");
    // return (
    //   <ErrorState
    //     message="An unknown error occured"
    //     src="/empty-box.png"
    //     onRetry={() => fetchTopicMessages({ page: 1 })}
    //   />
    // );
  }
  // if (messages.length === 0 && !loading) {
  //   return <ErrorState message="No messages yet..." src="/empty-box.png" />;
  // }

  return (
    <FadeDown>
      <div className="flex items-center w-full flex-col">
        <div className="w-full max-w-4xl ">
          <div className="flex justify-between items-center w-full px-2 mt-20 gap-1">
            <div className="text-xl sm:text-2xl bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-200">
              <h1>Hello world</h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={loadingDelete}
              className="bg-gray-200 text-gray-800 rounded-xl p-2 hover:shadow hover:text-red-500 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
            >
              <Trash size={18} />
            </button>
          </div>
          <div className="w-full rounded-2xl sm:p-4 border-1 border-gray-100 shadow-md mt-5">
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
                    inDashboard={false}
                  />
                ))}
                <div
                  ref={loaderRef}
                  className="fixed left-1/2 -translate-x-1/2 pt-1"
                >
                  {loading && (
                    <Loader2 size={25} className="animate-spin text-blue-500" />
                  )}
                  {messages.length === 0 && !loading && (
                    <span className="text-sm text-gray-700">
                      No more messages
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleAction={deleteTopic}
        loading={loadingDelete}
        header="Delete Topic"
        warning="Are you sure you want to delete this topic? This action cannot be undone."
        btnAction="Delete"
      />
    </FadeDown>
  );
};

export default TopicMessagesList;
