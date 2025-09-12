import { useEffect, useRef, useState } from "react";
import MessageCard from "@/features/dashboard/components/MessageCard";
// import ErrorState from "@/shared/components/UI/ErrorBoundary";
import {
  Calendar,
  Camera,
  Clock,
  Copy,
  ImageDown,
  Link2,
  Loader2,
  MessageCircleCode,
  Tag,
  Trash,
  X,
} from "lucide-react";
import { useTopicMessages } from "../../hooks/useTopicMessages";
import { FadeDown } from "@/shared/components/Motion";
import { useDeleteTopic } from "../../hooks/useDeleteTopic";
import { useNavigate, useParams } from "react-router-dom";
import ActionModal from "@/shared/components/UI/Modals/Action/ActionModal";
import { useFetchTopic } from "../../hooks/useFetchTopic";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { formatDate } from "@/shared/utils/formatDate";
import { timeUntil } from "@/shared/utils/timeUntil";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { HashLoader } from "react-spinners";

const TopicMessagesList = () => {
  const { topicId } = useParams();
  // console.log("topicId at useTopicMessages hook:", topicId);
  const navigate = useNavigate();

  const {
    messages,
    pagination,
    loadMore,
    error: messageError,
    loading,
    fetchTopicMessages,
  } = useTopicMessages();
  const { handleDelete, loadingDelete } = useDeleteTopic();
  const {
    topicDetails,
    loading: topicLoading,
    error: topicError,
  } = useFetchTopic(topicId ?? "");

  console.log("topic details:", topicDetails);

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
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }

  if (topicError) {
    <ErrorState message="An unknown error occured" src="/empty-box.png" />;
  }

  return (
    <FadeDown>
      <div className="w-full h-full min-h-screen mt-16 pt-3 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100 relative overflow-hidden">
        <div className="flex items-center w-full flex-col">
          <div className="w-full max-w-4xl ">
            <div className="flex flex-col sm:flex-row justify-between w-full items-center bg-white rounded-xl p-2">
              <div className="flex flex-col sm:px-2 gap-1 mt-2 w-full sm:border-r sm:border-gray-300">
                <div className="flex flex-col min-w-0 flex-1 border-b border-gray-300 pb-4 sm:border-0">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2 text-xl sm:text-2xl sm:py-1 max-w-xl">
                      <Tag size={18} className="text-gray-700" />
                      <h1 className="text-gray-800 break-words">
                        {topicDetails?.topic}
                      </h1>
                    </div>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={loadingDelete}
                      className="text-gray-500 rounded-xl p-2 hover:shadow hover:text-red-500 active:scale-95 cursor-pointer transition-all hover:bg-gray-200 shrink-0"
                    >
                      <Trash size={18} />
                    </button>
                  </div>

                  <div className="flex gap-3 items-center mt-1">
                    <div className="flex items-center gap-2">
                      <Link2 size={16} className="text-gray-700 shrink-0" />

                      <div className="text-xs sm:text-sm bg-gray-50 px-2 py-1 sm:px-2 sm:py-1 rounded-lg border border-gray-200 min-w-0 max-w-[200px] sm:max-w-md">
                        <p className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                          {topicDetails?.topicLink}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        copyToClipboard(`m/${topicDetails?.topicLink}`)
                      }
                      className="text-gray-500 outline-0 shrink-0 hover:cursor-pointer active:scale-95"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 my-3">
                  <div className="flex items-center gap-2">
                    <MessageCircleCode size={14} className="text-gray-700" />
                    <p className="text-gray-700 text-xs sm:text-sm">
                      Messages: {topicDetails?.messageCount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-700 sm:text-sm" />

                    <p className="text-gray-700 text-xs">
                      Created: {formatDate(topicDetails?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                {(topicDetails?.topicImgUrls?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mt-3 sm:ml-6">
                      <ImageDown size={15} className="text-gray-700" />
                      <p className="text-gray-700 text-base">Images</p>
                    </div>
                    <div className="flex justify-between flex-row gap-4 overflow-hidden mt-1">
                      {topicDetails?.topicImgUrls.map((img, i) => (
                        <img
                          key={i}
                          src={img.url}
                          alt={`preview-${i}`}
                          onClick={() => setModalImg(img.url)}
                          className="w-[50%] h-20 my-2 rounded-xl object-contain object-center cursor-pointer transition-all hover:scale-[1.01]"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {(topicDetails?.topicImgUrls?.length ?? 0) > 0 && (
                  <div className="mt-2 sm:mr-8 text-sm text-gray-600 flex justify-end items-center gap-1">
                    <Clock size={14} className="text-gray-500" />
                    <p>{timeUntil(topicDetails?.topicImgUrls[0].expiresAt)}</p>
                  </div>
                )}

                {topicDetails?.hadImages &&
                  topicDetails?.topicImgUrls?.length === 0 && (
                    <div className="flex items-center gap-2 text-gray-700 text-sm mt-4 sm:ml-2">
                      <Camera size={15} />
                      <p>Images expired after 15 days</p>
                    </div>
                  )}
              </div>
            </div>

            <div className="text-xl sm:text-2xl bg-white max-w-max px-3 sm:px-4 sm:py-1 mt-4  rounded-xl border border-gray-200">
              <h1 className="text-gray-800">Messages</h1>
            </div>
            <div className="w-full rounded-2xl my-2">
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
                    className="flex justify-center items-center p-4"
                  >
                    {loading && (
                      <Loader2
                        size={25}
                        className="animate-spin text-blue-500"
                      />
                    )}
                    {!pagination?.hasNextPage && !loading && !messageError && (
                      <span className="text-sm text-gray-500">
                        No more messages
                      </span>
                    )}

                    {messageError && !loading &&(
                      <p className="text-xs text-red-500">
                        An error occured while loading messages
                      </p>
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
        warning="Are you sure? All topic data will be lost!"
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
