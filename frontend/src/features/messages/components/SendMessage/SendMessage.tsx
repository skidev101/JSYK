import { useState } from "react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useTopicData } from "../../hooks/useTopicData";
import { useSendMessage } from "../../hooks/useSendMessage";
import { HashLoader } from "react-spinners";

const SendMessage = () => {
  const { profileSlug, slug } = useParams();
  const topicId = slug?.split("-").pop();
  const [messageToSend, setMessageToSend] = useState("");
  const { data, loadingTopic } = useTopicData(profileSlug, topicId); // add topicError
  const { sendMessage, loading, success, error } = useSendMessage();
  const themeColor = "#3570F8";

  if (loadingTopic) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] p-8">
        <HashLoader size={40} color="#000" />
        {/* <div className="text-lg">Loading dashboard...</div> */}
      </div>
    );
  }
  // if (topicError) return <div>An error occured</div>

  const handleSendMessage = async () => {
    if (!profileSlug) return <div>Oops... That's not right</div>;
    await sendMessage({
      profileSlug,
      topicId,
      messageToSend,
      themeColor: data?.themeColor || themeColor,
    });

    if (success) {
      toast.success("Message sent");
      setMessageToSend("");
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <FadeIn>
      <div className="relative w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* <div className="absolute inset-0 mesh-gradient"></div> */}

        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 ">
          <p className="text-sm text-gray-500">
            Message @{data?.username} anonymously 🤫
          </p>
          <MessageCard
            username={data?.username}
            profileImgUrl={data?.profileImgUrl}
            topicImgUrls={data?.topicImgUrls?.map((img) => img.url)}
            topic={data?.topic}
            preview={false}
            inView={false}
            loading={loading}
            messageToSend={messageToSend}
            setMessageToSend={setMessageToSend}
            onSend={handleSendMessage}
            themeColor={data?.themeColor || themeColor}
            error={error}
          />
          <div className="text-center text-gray-700">
            {/* <p className="text-sm">
              wanna recieve anonymous messages
              <br /> too? 👉{" "}
              <a href="/register" className="text-blue-600 underline">
                Sign up
              </a>
            </p> */}
            <p className="fixed bottom-2 left-1/2 -translate-x-1/2 text-sm">
              jsyk by monaski
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default SendMessage;
