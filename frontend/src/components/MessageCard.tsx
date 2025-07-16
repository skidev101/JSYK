import { useNavigate } from "react-router-dom";
import { DownloadCloudIcon } from "lucide-react";

interface MessageCardProps {
  messageId: string;
  topic?: string;
  message: string;
  isRead: boolean;
}

const MessageCard = ({
  messageId,
  topic,
  message,
  isRead,
}: MessageCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/view/${messageId}`)}
      className="relative rounded-lg bg-white p-2 sm:p-4 cursor-pointer hover:scale-[1.01] transition-all duration-200"
    >
      {isRead && (
        <div className="hidden absolute top-0 left-0 w-full h-full opacity-[0.3] bg-gray-50 rounded-lg z-50">
          {/* opaque bg for read messages */}
        </div>
      )}
      <div className="flex justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 outline-4 outline-gray-100 rounded-full">
            <p className="text-sm sm:text-base">J</p>
          </div>
          <h1 className="text:md sm:text-lg text-gray-700">anonymous</h1>
        </div>
        <button className="w-8 h-8 sm:w-9 sm:h-9 grid place-items-center bg-gray-100 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.98] transition duration-150">
          <DownloadCloudIcon size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base max-w-max rounded-xl text-gray-800 bg-gray-100 px-2 sm:px-3">
          {topic}
        </p>
        <div className="w-full bg-gray-100 p-3 mt-1 rounded-xl">
          <p className="text-sm sm:text-base">{message}</p>
        </div>
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
