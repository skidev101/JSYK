import { useNavigate } from "react-router-dom";
// import { DownloadCloudIcon } from "lucide-react";

interface MessageCardProps {
  messageId: string;
  topic?: string;
  message: string;
  isRead: boolean;
  themeColor: string;
  inDashboard?: boolean;
}

const MessageCard = ({
  messageId,
  topic,
  message,
  isRead,
  themeColor,
  inDashboard
}: MessageCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/view/${messageId}`)}
      className="relative min-w-0 cursor-pointer border border-[#d9dcd4] bg-[#fffefa] p-4 transition hover:-translate-y-0.5 hover:border-[#275d49]"
    >
      {isRead && inDashboard && (
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.2] bg-gray-50 rounded-lg z-50">
          {/* opaque bg for read messages */}
        </div>
      )}
      <div className="flex items-center justify-between gap-3 border-b border-[#e2e4de] pb-3">
        <div className="flex items-center gap-2">
          <div
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d9dcd4] bg-[#f0f1eb] text-sm"
            style={{ outlineColor: themeColor }}
          >
            <p style={{ color: themeColor }}>{topic?.charAt(0) || "J"}</p>
          </div>
          <h1 className="max-w-[220px] truncate font-mono text-[10px] font-medium text-[#707871]">
            {topic ? topic : "anonymous"}
          </h1>
        </div>
        {/* <button className="w-8 h-8 sm:w-9 sm:h-9 grid place-items-center bg-gray-100 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.98] transition duration-150">
          <DownloadCloudIcon size={18} />
        </button> */}

        {!isRead && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#e86b3c]"></span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {/* <p className="text-base sm:text-md max-w-max rounded-xl text-gray-800 bg-gray-100 px-2 sm:px-3">
          {topic}
        </p> */}
        <div className="mt-3 border-l-2 border-[#e86b3c] bg-[#f0f1eb] p-3">
          <p className="truncate text-sm leading-5 text-[#343b36]">{message}</p>
        </div>
        {/* future updates */}
        {/* <div className="flex items-center gap-2 mt-2">
          <p className="text-sm max-w-max rounded-xl text-gray-500 bg-gray-100 px-2 sm:px-3">
            # yesterday
          </p>
          <p className="text-sm max-w-max rounded-xl text-gray-500 bg-gray-100 px-2 sm:px-3">
            # girl
          </p>
          <p className="text-sm max-w-max rounded-xl text-gray-500 bg-gray-100 px-2 sm:px-3">
            # food
          </p>
        </div> */}

        {/* <div className="flex items-center text-gray-400 mt-1 gap-1.5">
          <Link size={18} />
          <p>Link</p>
        </div>
        
        <div className="relative flex justify-between items-center w-full text-gray-600 bg-gray-100 p-2.5 mb-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden">
          <p className="text-sm sm:text-base ">{link}</p>
          <button className="absolute right-2 w-8 h-8 sm:w-9 sm:h-9 grid place-items-center bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 hover:scale-[1.01] active:scale-[0.97] transition duration-150">
            <Copy size={18} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MessageCard;
