import { useState } from "react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTopicData } from "../../hooks/useTopicData";


const SendMessage = () => {
  const { profileSlug, slug } = useParams();
  const topicId = slug?.split("-").pop();
  const [messageToSend, setMessageToSend] = useState("");
  const [loadingMessageData, setLoadingMessageData] = useState(false);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const { data } = useTopicData(profileSlug, topicId);
  const themeColor = "#3570F8"; 

  if (loadingMessageData) return <div>Loading...</div>

  

  return (
    <FadeIn>
      <div className="relative w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 ">
          <p className="text-sm text-gray-500">Message ski101 anonymously 🤫</p>
          <MessageCard
            username={data?.username}
            profileImgUrl={data?.profileImgUrl}
            topicImgUrls={data?.topicImgUrls}
            topic={data?.topic}
            preview={false}
            inView={false}
            loading={loadingSendMessage}
            messageToSend={messageToSend}
            setMessageToSend={setMessageToSend}
            onSend={handleSendMessage}
            themeColor={data?.themeColor || themeColor}
            error={error}
          />
          <div className="text-center text-gray-700">
            <p className="text-sm">
              wanna recieve anonymous messages
              <br /> too? 👉{" "}
              <a href="/register" className="text-blue-600 underline">
                Sign up
              </a>
            </p>
            <p className="fixed bottom-2 left-1/2 -translate-x-1/2 text-sm">
              something by monaski
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default SendMessage;
