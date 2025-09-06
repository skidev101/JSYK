import { useEffect, useRef, useState } from "react";
import MessageCard from "@/features/dashboard/components/MessageCard";
// import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { Copy, Loader2, Trash, X } from "lucide-react";
import { useTopicMessages } from "../../hooks/useTopicMessages";
import { FadeDown } from "@/shared/components/Motion";
import { useDeleteTopic } from "../../hooks/useDeleteTopic";
import { useNavigate, useParams } from "react-router-dom";
import ActionModal from "@/shared/components/UI/Modals/Action/ActionModal";
import { useFetchTopic } from "../../hooks/useFetchTopic";

const TopicMessagesList = () => {
  const { topicId } = useParams();
  // console.log("topicId at useTopicMessages hook:", topicId);
  const navigate = useNavigate();

  const { messages, pagination, loadMore, error, loading, fetchTopicMessages } =
    useTopicMessages();
  const { handleDelete, loadingDelete } = useDeleteTopic();
  const {
    topicDetails,
    loading: topicLoading,
    error: topicError,
  } = useFetchTopic(topicId ?? "");

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal if click is on the overlay, not the image container
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalImg(null);
    }
  };

  if (topicLoading) {
    return <div>Loading...</div>;
  }
  if (topicError) {
    return <div>An Error occured...</div>;
  }

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
      <div className="w-full h-full min-h-screen mt-16 pt-3 ">
        <div className="flex items-center w-full flex-col">
          <div className="w-full max-w-4xl ">
            <div className=" rounded-lg py-2">
              <div className="flex justify-between items-center w-full px-2 gap-1 mt-2">
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="text-xl sm:text-2xl bg-gray-100 px-3 sm:px-4 sm:py-1 rounded-xl border border-gray-200 max-w-xl">
                    <h1 className="text-gray-800 break-words">{topicDetails?.topic}</h1>
                  </div>

                  <div className="flex gap-2 items-center min-w-0 mt-2">
                    <div className="text-sm bg-gray-50 px-3 py-1 sm:px-4 sm:py-1 rounded-full border border-gray-200 min-w-0 max-w-md">
                      <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">{topicDetails?.topicLink}</p>
                    </div>
                    <button className="text-gray-500 outline-0 shrink-0">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={loadingDelete}
                  className="bg-gray-200 text-gray-800 rounded-xl p-2 hover:shadow hover:text-red-500 active:scale-95 cursor-pointer transition-all hover:bg-gray-300 shrink-0"
                >
                  <Trash size={18} />
                </button>
              </div>

              {topicDetails?.topicImgUrls?.length ? (
                <div className="flex justify-between flex-row gap-4 overflow-hidden mt-1">
                  {topicDetails.topicImgUrls.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={`preview-${i}`}
                      onClick={() => setModalImg(img.url)}
                      className="w-[50%] h-20 my-2 rounded-xl object-contain object-center cursor-pointer transition-all hover:scale-[1.01]"
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="text-xl sm:text-2xl bg-gray-100 max-w-max px-3 sm:px-4 sm:py-1 mt-4 ml-2 rounded-xl border border-gray-200">
              <h1 className="text-gray-800">Messages</h1>
            </div>
            <div className="w-full rounded-2xl sm:p-4 border-1 border-gray-100 shadow-md my-2">
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
                  <div ref={loaderRef} className=" pt-1">
                    {loading && (
                      <Loader2
                        size={25}
                        className="animate-spin text-blue-500"
                      />
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

      {/* Image Modal */}
      {modalImg && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800"
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-2 right-2 text-white p-1 rounded-full bg-gray-500 hover:bg-gray-800 hover:cursor-pointer transition"
            >
              <X size={24} />
            </button>
            <img
              src={modalImg}
              alt="enlarged"
              className="max-w-full max-h-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </FadeDown>
  );
};

export default TopicMessagesList;
