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
import OpenBoxIcon from "@/shared/components/UI/OpenBoxIcon";

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

  if (!data) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <OpenBoxIcon size={120} />
        <p className="text-gray-700 text-md mt-3">Topic does not exist</p>
      </div>
      // <ErrorState message="Topic does not exist" src="/box.png" />
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
      <div className="public-page">
        {/* Subtle blurred shapes */}
        <div className="public-shell">
          <div className="public-brand"><a className="app-brand" href="/"><span className="app-brand-mark">J</span><span>jsyk</span></a><span>anonymous message</span></div>

        {/* Card */}
        <div className="public-card">
          <h1>Send <span>@{data?.username}</span> a note.</h1>
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

          <p className="public-card-footer">
            JSYK by{" "}
            <a
              href="https://x.com/monaski_"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 underline"
            >
              monaski
            </a>
          </p>
        </div></div>
      </div>
    </FadeIn>
  );
};

export default SendMessage;
