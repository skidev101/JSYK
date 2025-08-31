import { Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

interface MessageCardProps {
  profileImgUrl?: string;
  username?: string;
  topic?: string;
  topicImgUrls?: string[];
  message?: string;
  messageToSend?: string;
  setMessageToSend?: (msg: string) => void;
  preview: boolean;
  inView: boolean;
  loading?: boolean;
  onImageClick?: (url: string) => void;
  onSend?: () => void;
  themeColor?: string;
  error?: string;
}

const MessageCard = ({
  profileImgUrl,
  username,
  topic,
  topicImgUrls,
  message,
  preview,
  inView,
  loading,
  // onImageClick,
  messageToSend,
  setMessageToSend,
  onSend,
  themeColor,
  error,
}: MessageCardProps) => {
  const [modalImg, setModalImg] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal if click is on the overlay, not the image container
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalImg(null);
    }
  };

  return (
    <div className="relative w-full bg-white rounded-3xl shadow-md p-4">
      <div
        className="absolute top-0 left-0 z-10 w-full h-16 px-4 py-4 rounded-t-3xl"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 mt-1">
            {!inView && (
              <img
                src={profileImgUrl || "/default-pfp.webp"}
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 p-[1.4px] border-white"
              />
            )}
            <h1
              className={`text-md sm:text-lg font-semibold ${
                username === "anonymous" ? "text-gray-100" : "text-white"
              }`}
            >
              @{username}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-200">jsyk</p>
        </div>
      </div>

      <div className="mt-18">
        {topic && (
          <>
            <div className="max-w-max px-2 py-1 sm:px-3 bg-gray-100 rounded-xl">
              <p className="text-sm sm:text-base text-gray-800 truncate">
                {topic}
              </p>
            </div>
            <div className="flex justify-center items-center"></div>
          </>
        )}

        {topicImgUrls && topicImgUrls.length > 0 && (
          <div className="flex justify-between flex-row gap-4 overflow-hidden mt-1">
            {topicImgUrls.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                onClick={() => setModalImg(src)}
                className="w-[50%] h-20 my-2 rounded-xl object-contain object-center cursor-pointer transition-all hover:scale-[1.01]"
              />
            ))}
          </div>
        )}

        {message ? (
          <>
            <div className="w-full max-h-max text-center p-2 sm:p-3 mt-2 bg-gray-100 rounded-2xl">
              <p className="text-sm sm:text-base">{message}</p>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={messageToSend}
              onChange={(e) => setMessageToSend?.(e.target.value)}
              readOnly={preview}
              placeholder="Enter your message here" //TODO Enable changing placeholder and enable random messages
              className={`flex justify-center items-center w-full min-h-30 p-2 my-3 bg-gray-100 ${
                preview ? "resize-none" : "focus:ring-2 focus:ring-blue-500"
              } border-none outline-none rounded-lg`}
            />

            {error && (
              <p className="text-sm text-center pb-2 text-red-500">{error}</p>
            )}

            <button
              onClick={onSend}
              disabled={preview || loading}
              className={`flex justify-center items-center w-full py-2 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } ${
                inView ? "hidden" : ""
              } text-white font-semibold bg-blue-500 hover:bg-blue-400 hover:scale-[1.01] active:scale-[0.98] rounded-full transition duration-200`}
              style={{ backgroundColor: themeColor }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "SEND"
              )}
            </button>
          </>
        )}
      </div>

      {/* Image Modal */}
      {modalImg && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800"
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-2 right-2 text-white p-1 rounded-full hover:bg-gray-800 transition"
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
    </div>
  );
};

export default MessageCard;
