import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ViewMessageCard from "../components/ViewMessageCard";
import { FadeIn } from "../components/MotionWrappers";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface MessageData {
  topic?: string;
  content: string;
  profileImgUrl: string;
  topicImgUrls: string[];
  createdAt: string;
}

const ViewMessage = () => {
  const { messageId } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState<MessageData | null>(null)
  const [loading, setLoading] = useState(true);

  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/message/${messageId}`, {
          headers: {
            "Authorization": `Bearer ${user?.idToken}`
          }
        });
        setData(response.data.data);
      } catch (err: any) {
        console.error('Error while fetching full message:', err)
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, [messageId])

  return (
    <div className="relative">
      <div className="w-full fixed top-0 left-0 flex items-center p-2 sm:p-4 mt-20">
        <button
          onClick={() => navigate("/")}
          className="grid place-items-center rounded-lg p-1 sm:p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <FadeIn>
        <div className="w-full flex flex-col justify-center items-center min-h-screen">
          <div
            ref={messageRef}
            className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 bg-gray-100"
          >
            <ViewMessageCard
              profileImgUrl={data?.profileImgUrl}
              topicImgUrls={data?.topicImgUrls}
              topic="hello world"
              message={data?.content}
              preview={true}
            />
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ViewMessage;
