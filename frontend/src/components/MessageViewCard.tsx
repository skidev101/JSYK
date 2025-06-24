import { FileQuestionIcon } from "lucide-react";

type MessageViewCardProps = {
  profileImgUrl?: string;
  username: string;
  topic: string;
  topicImgUrl?: string;
  message?: string;
};

const MessageViewCard: React.FC<MessageViewCardProps> = ({ profileImgUrl, username, topic, topicImgUrl, message }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={profileImgUrl}
            alt=""
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <h1 className="text-md sm:text-lg font-semibold text-gray-600">
            @{username}
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-500">JSYK</p>
      </div>

      <div className="max-w-max px-2 py-1 my-3 sm:px-3 bg-gray-100 rounded-xl">
        <p className={`text-sm sm:text-base ${topic.trim() == '#JSYK' ? 'text-gray-500' : 'text-gray-800'}`}>
          {topic}
        </p>
      </div>

      <img
        src={topicImgUrl}
        alt=""
        className="w-full h-20 my-2 rounded-lg object-contain object-center"
      />

      {message ? (
        <>
          <div className="w-full max-h-max p-2 bg-gray-100 rounded-md">
            <p className="text-sm sm:text-base">{message}</p>
          </div>
        </>
      ) : (
        <>
          <textarea
            placeholder="Enter your message here" //TODO Enable changing placeholder
            className="w-full min-h-30  p-2 my-3 bg-gray-100 focus:ring-2 focus:ring-blue-500 border-none outline-none rounded-md"
          />
          <button className="w-full py-2 text-white font-semibold bg-blue-500 hover:bg-blue-400 hover:scale-[1.01] active:scale-[0.98] rounded-lg cursor-pointer transition duration-200">
            SEND
          </button>
        </>
      )}
    </div>
  );
};

export default MessageViewCard;
