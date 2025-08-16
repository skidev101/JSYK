import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  // AlertTriangle,
  ChevronLeft,
  Download,
  Ellipsis,
  Trash,
  X,
} from "lucide-react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import { useViewMessage } from "../../hooks/useViewMessage";
import { HashLoader } from "react-spinners";
import SocialShareButtons from "../SocialShareButtons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import toast from "react-hot-toast";
import { useDashboardStore } from "@/store/dashboardStore";
import { useGetShareImage } from "../../hooks/useGetShareImage";

const ViewMessage = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const { messageId } = useParams();
  if (!messageId) return <div>oops... no message ID</div>;
  const { data, loadingMessage } = useViewMessage(messageId); // add error
  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const themeColor = "#3570F8";
  const { deleteMessage } = useDeleteMessage(); // add loading
  const removeMessage = useDashboardStore((state) => state.removeMessage);
  const { handleDownload } = useGetShareImage();

  if (loadingMessage) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }
  // if (error) return <div className="text-md mt-40 mr-20">An error occured</div>;

  const handleImageDownload = (e: React.FormEvent) => {
    e.stopPropagation;
    const payload = {
      profileImgUrl: data?.profileImgUrl,
      topic: data?.topic,
      message: data?.content,
      themeColor: data?.themeColor || themeColor
    }
    handleDownload(payload);
  }


  const handleDelete = async () => {
    // if (messageId) return;
    console.log("now in delete func");

    try {
      const res = await deleteMessage(messageId);

      if (res) {
        removeMessage(messageId);
        toast.success("Message Deleted");
        console.log("deleted message");
        navigate("/");
      } else {
        toast.error("Failed to delete");
        console.log("failed to delete message");
      }
      // if (loadingDelete) {
      //   toast.loading("Deleting messages");
      // }

    } catch (err) {
      console.error("error in delete func", err);
    }
  };

  return (
    <div className="relative">
      <div className="w-full flex justify-end sm:justify-between items-center p-2 sm:p-4 mt-20">
        <button
          onClick={() => navigate("/")}
          className="hidden sm:grid place-items-center rounded-2xl p-1 sm:p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className="sm:hidden relative bg-gray-100 rounded-xl p-2 hover:scale-105 shadow-sm active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
        >
          {showDropdown ? (
            <X size={20} />
          ) : (
            <Ellipsis size={20} className="text-gray-700" />
          )}
        </div>

        <div
          className={`${
            showDropdown ? "flex" : "hidden"
          } sm:hidden absolute top-14 right-2 z-20 flex-col bg-gray-100 shadow-md border-1 border-gray-200 rounded-md`}
        >
          <button 
          onClick={(e) => handleImageDownload(e)}
          className="text-sm flex items-center active:bg-white active:scale-95 w-full p-3 transition-all duration-100 gap-1">
            <Download size={20} />
            <p>Download</p>
          </button>

          {/* <div className="text-sm flex items-center active:bg-white active:scale-95 w-full p-3 transition-all duration-100 gap-1">
            <AlertTriangle size={18} />
            <p>Report spam</p>
          </div> */}

          <button
            onClick={() => handleDelete()}
            className="text-sm flex items-center active:bg-white active:scale-95 w-full p-3 transition-all duration-100 gap-1 text-red-500"
          >
            <Trash size={18} />
            <p>Delete</p>
          </button>
        </div>

        <div className="hidden sm:flex items-center max-w-max bg-gray-100 rounded-xl gap-3 p-2 shadow-sm">
          {/* <div className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
            <AlertTriangle size={20} className="text-red-500" />
            </div> */}
          <button 
            onClick={(e) => handleImageDownload(e)}
            className="bg-gray-200 text-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
            <Download size={20} />
          </button>
            <button
              onClick={() => handleDelete()}
              className="bg-gray-200 text-gray-800 hover:text-red-500 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
            >
              <Trash size={20} />
            </button>
        </div>
      </div>

      <FadeIn>
        <div className="w-full flex flex-col justify-center items-center mt-5">
          <div
            ref={messageRef}
            className="w-full max-w-sm h-full flex justify-center flex-col items-center gap-3 rounded-xl p-2 sm:p-4 bg-gray-100 shadow-md"
          >
            <MessageCard
              profileImgUrl={data?.profileImgUrl}
              topicImgUrls={data?.topicImgUrls}
              topic={data?.topic}
              message={data?.content}
              preview={true}
              inView={true}
              themeColor={data?.themeColor || themeColor}
            />
          </div>

          <SocialShareButtons url="hiii" text="Check this out" />
        </div>
      </FadeIn>
    </div>
  );
};

export default ViewMessage;
