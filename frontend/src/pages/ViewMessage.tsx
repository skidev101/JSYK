import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import MessageViewCard from "../components/MessageViewCard";
import { FadeIn } from "../components/MotionWrappers";

const ViewMessage = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
            <MessageViewCard
              profileImgUrl="/form.webp"
              username="ski101"
              // topicImgUrl="/form.webp" heloo
              // message="I wanna define what the term invention means. the other day at the convention, you said invention means doing stuff to make stuff work"
            />
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ViewMessage;
