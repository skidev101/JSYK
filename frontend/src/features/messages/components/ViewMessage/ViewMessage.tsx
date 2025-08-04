import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  BatteryLow,
  ChevronLeft,
  Circle,
  ClipboardX,
  Ellipsis,
  ScreenShare,
  Trash,
} from "lucide-react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import { useViewMessage } from "../../hooks/useViewMessage";
import { HashLoader } from "react-spinners";



const ViewMessage = () => {
  const { messageId } = useParams();
  if (!messageId) return <div>oops... no message ID</div>
  const { data, loading, error } = useViewMessage(messageId);
  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <HashLoader size={40} color="#000"/>
      </div>
    )
  }
  if (error) return <div className="text-md mt-40 mr-20">An error occured</div>;

  return (
    <div className="relative">
      <div className="w-full flex justify-end sm:justify-between items-center p-2 sm:p-4 mt-20">
        <button
          onClick={() => navigate("/")}
          className="hidden sm:grid place-items-center rounded-lg p-1 sm:p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="sm:hidden bg-gray-100 rounded-xl p-2 hover:scale-105 shadow-sm active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <Ellipsis size={20} className="text-gray-700" />{" "}
          {/* TODO: dropdown- report, delete, screenshot */}
        </div>

        <div className="hidden sm:flex items-center max-w-max bg-gray-100 rounded-xl gap-3 p-2 shadow-sm">
          <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
            <Trash size={20} className="hover:text-red-500"/>
          </div>
          <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
            <AlertTriangle size={20} className="text-red-500"/>
          </div>
          <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
            <ScreenShare size={20} />
          </div>
        </div>
      </div>

      <FadeIn>
        <div className="w-full flex flex-col justify-center items-center mt-5">
          <div
            ref={messageRef}
            className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 bg-gray-100 shadow-md"
          >
            <MessageCard
              profileImgUrl={data?.profileImgUrl}
              topicImgUrls={data?.topicImgUrls}
              topic={data?.topic}
              message={data?.content}
              preview={true}
              inView={true}
            />
          </div>
          <div className="flex items-center flex-col mt-5">
            <p className="text-sm text-gray-700 pb-2">Share to</p>
            <div className="flex items-center max-w-max bg-gray-100 rounded-3xl gap-3 p-4 shadow-sm">
              <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
                <ClipboardX size={25} />
              </div>
              <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
                <Circle size={25} />
              </div>
              <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
                <BatteryLow size={25} />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ViewMessage;
