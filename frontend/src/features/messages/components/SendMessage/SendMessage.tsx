import { useState } from "react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useTopicData } from "../../hooks/useTopicData";
import { useSendMessage } from "../../hooks/useSendMessage";
import { HashLoader } from "react-spinners";
// import { motion } from "framer-motion";
import ErrorState from "@/shared/components/UI/ErrorBoundary";

const SendMessage = () => {
  const navigate = useNavigate();
  const { profileSlug, slug } = useParams();
  const topicId = slug?.split("-").pop();
  const [messageToSend, setMessageToSend] = useState("");
  const { data, loadingTopic, topicError } = useTopicData(profileSlug, topicId);
  console.log("topicdata at send message page:", data);
  const { sendMessage, loading, error } = useSendMessage();
  const themeColor = "#3570F8";

  if (loadingTopic) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] p-8">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }

  if (topicError) {
    return (
      <ErrorState message="An unknown error occured" src="/empty-box.png" />
    );
  }

  const handleSendMessage = async () => {
    if (!profileSlug) return <div>Oops... That's not right</div>;
    const res = await sendMessage({
      profileSlug,
      topicId,
      messageToSend,
      themeColor: data?.themeColor || themeColor,
    });

    if (res) {
      // toast.success("Message sent");
      setMessageToSend("");
      navigate("/sent", { state: { username: data?.username }});
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <FadeIn>
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100 overflow-hidden">
        {/* Subtle blurred shapes */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Card */}
        <div className="relative w-full sm:max-w-md lg:max-w-lg bg-white/20 backdrop-blur-md shadow-xl rounded-2xl px-2 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-5">
          <h1 className="text-lg text-center font-semibold text-gray-800">
            Send <span className="shimmer-text">@{data?.username}</span> an
            anonymous message 🤫
          </h1>
          {/* <p className="text-sm text-gray-500 text-center">
            Be honest, kind, or funny — your identity will stay hidden.
          </p> */}

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

          {/* Call to Action */}
          {/* <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Wanna receive anonymous messages too?
            </p>
            <a href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                animate={{ x: [0, -3, 2, -3, 2, 0] }} // shake animation
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mt-2 px-6 py-2 text-sm font-medium text-blue-500"
              >
                Sign up
              </motion.button>
            </a>
          </div> */}

          <p className="text-sm text-gray-500">
            JSYK by{" "}
            <a
              href="https://x.com/monaski_"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 underline"
            >
              monaski
            </a>
          </p>
        </div>
      </div>
    </FadeIn>
  );
};

export default SendMessage;
