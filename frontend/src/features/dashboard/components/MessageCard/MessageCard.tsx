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
      className="relative rounded-xl bg-white p-2 sm:p-4 cursor-pointer hover:scale-[1.01] transition-all duration-200 shadow"
    >
      {isRead && inDashboard && (
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.2] bg-gray-50 rounded-lg z-50">
          {/* opaque bg for read messages */}
        </div>
      )}
      <div className="flex justify-between px-1 py-2">
        <div className="flex items-center gap-2">
          <div
            className="grid place-items-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 outline-2 rounded-full shrink-0"
            style={{ outlineColor: themeColor }}
          >
            <p className="text-sm sm:text-base" style={{ color: themeColor }}>{topic?.charAt(0) || "J"}</p>
          </div>
          <h1 className="text-sm sm:text-lg text-gray-600 rounded-xl bg-gray-100 px-2 sm:px-3 truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] sm:max-w-[290px]">
            {topic ? topic : "anonymous"}
          </h1>
        </div>
        {/* <button className="w-8 h-8 sm:w-9 sm:h-9 grid place-items-center bg-gray-100 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.98] transition duration-150">
          <DownloadCloudIcon size={18} />
        </button> */}

        {!isRead && (
          <span className="w-2 h-2 rounded-full bg-red-300"></span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {/* <p className="text-base sm:text-md max-w-max rounded-xl text-gray-800 bg-gray-100 px-2 sm:px-3">
          {topic}
        </p> */}
        <div className="w-full bg-gray-100 p-3 mt-1 rounded-xl">
          <p className="text-sm sm:text-base truncate">{message}</p>
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
