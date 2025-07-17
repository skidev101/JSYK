import { useEffect, useState } from "react";
import ViewMessageCard from "../components/ViewMessageCard";
import { FadeIn } from "../components/MotionWrappers";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";

interface TopicDataProps {
  username: string;
  profileImgUrl: string;
  topic: string;
  topicImgUrls?: string[];
  themeColor?: string;
}

const SendMessage = () => {
  const { profileSlug, slug } = useParams();
  const topicId = slug?.split("-").pop();

  const [messageToSend, setMessageToSend] = useState("");
  const [loading, setLoading] = useState(false);
  const [topicData, setTopicData] = useState<TopicDataProps | null>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!profileSlug) return;
      try {
        if (topicId) {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/topic/${profileSlug}/${topicId}`
          );
          setTopicData(response.data.data);
        } else {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/profile/${profileSlug}`
          );
          setTopicData(response.data.data);
        }
      } catch (err: any) {
        console.log("Error fetching topic info:", err);
      }
    };

    fetchTopicData();
  }, [topicId]);

  const handleSendMessage = async () => {
    if (!messageToSend.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:3000/api/message", {
        profileSlug,
        topicId,
        content: messageToSend,
      });

      toast.success("Message sent");
      setMessageToSend("");
    } catch (err: any) {
      console.log("Error sending message:", err);
      toast.error("An error occured");
    } finally {
      setLoading(false);
      setMessageToSend("");
    }
  };

  return (
    <FadeIn>
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 bg-gray-100">
          <ViewMessageCard
            username={topicData?.username}
            profileImgUrl={topicData?.profileImgUrl}
            topicImgUrls={topicData?.topicImgUrls}
            topic={topicData?.topic}
            preview={false}
            inView={false}
            loading={loading}
            messageToSend={messageToSend}
            setMessageToSend={setMessageToSend}
            onSend={handleSendMessage}
            themeColor={topicData?.themeColor}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default SendMessage;
