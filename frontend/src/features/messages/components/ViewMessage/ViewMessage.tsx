import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Download, Ellipsis, Trash, X } from "lucide-react";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import { useViewMessage } from "../../hooks/useViewMessage";
// import SocialShareButtons from "../SocialShareButtons";
import { useDeleteMessage } from "../../hooks/useDeleteMessage";
import toast from "react-hot-toast";
import { useDashboardStore } from "@/store/dashboardStore";
import { toBlob } from "html-to-image";
import ActionModal from "@/shared/components/UI/Modals/Action/ActionModal";
import { HashLoader } from "react-spinners";
import ErrorState from "@/shared/components/UI/ErrorBoundary";

const ViewMessage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { messageId } = useParams();
  if (!messageId) return <div>oops... no message ID</div>;

  const { data, loadingMessage, error } = useViewMessage(messageId);
  console.log("topic img urls at view message:", data?.topicImgUrls);

  const messageRef = useRef<HTMLDivElement>(null);
  const { deleteMessage, loadingDelete } = useDeleteMessage();
  const removeMessage = useDashboardStore((state) => state.removeMessage);
  const themeColor = "#3570F8";

  if (loadingMessage) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState message="An unknown error occured" src="/empty-box.png" />
    );
  }

  if (!data) {
    return (
      <ErrorState message="An unknown error occured" src="/empty-box.png" />
    );
  }

  const handleImageDownload = async () => {
    if (!messageRef.current) return;

    try {
      const toastId = toast.loading("Downloading");
      await (document as any).fonts.ready;

      const options = {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: Math.max(2, window.devicePixelRatio || 1),
      };

      const blob = await toBlob(messageRef.current, options);
      if (!blob) throw new Error("Failed to create image blob");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "message.png";
      link.click();
      URL.revokeObjectURL(url);

      toast.success("Downloaded", { id: toastId });
    } catch (err) {
      toast.error("Failed to download image");
      console.error("Image capture failed:", err);
    }
  };

  const handleDelete = async () => {
    // if (messageId) return;
    console.log("now in delete func");

    try {
      const res = await deleteMessage(messageId);

      if (res) {
        removeMessage(messageId);
        toast.success("Message Deleted");
        console.log("deleted message");
        navigate("/dashboard");
      } else {
        toast.error("Failed to delete");
        console.log("failed to delete message");
      }
    } catch (err) {
      console.error("error in delete function call", err);
    }
  };

  return (
    <div className="relative ">
      <div className="w-full flex justify-between items-center p-2 sm:p-4 mt-20">
        <button
          onClick={() => window.history.back()}
          className="hidden sm:grid place-items-center rounded-2xl p-1 sm:p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
        >
          <ChevronLeft size={22} />
        </button>

        <p className="text-sm text-gray-400">
          {new Date(data?.createdAt || "2025").toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          ·{" "}
          {new Date(data?.createdAt || "2025").toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

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
            onClick={() => handleImageDownload()}
            className="text-sm flex items-center active:bg-white active:scale-95 w-full p-3 transition-all duration-100 gap-1"
          >
            <Download size={20} />
            <p>Download</p>
          </button>

          {/* <div className="text-sm flex items-center active:bg-white active:scale-95 w-full p-3 transition-all duration-100 gap-1">
            <AlertTriangle size={18} />
            <p>Report spam</p>
          </div> */}

          <button
            onClick={() => setShowDeleteModal(true)}
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
            onClick={() => handleImageDownload()}
            className="bg-gray-200 text-gray-800 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
          >
            <Download size={20} />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-gray-200 text-gray-800 hover:text-red-500 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>

      <FadeIn>
        <div className="w-full flex flex-col justify-center items-center mt-5 mb-16">
          <div
            ref={messageRef}
            className="w-full max-w-sm h-full flex justify-center flex-col items-center gap-3 rounded-xl px-2 py-6   sm:p-4 bg-gray-100 shadow-md"
          >
            <MessageCard
              username="anonymous"
              profileImgUrl={data?.profileImgUrl}
              topicImgUrls={data?.topicImgUrls}
              topic={data?.topic}
              message={data?.content}
              preview={true}
              inView={true}
              themeColor={data?.themeColor || themeColor}
            />

            <p className="text-sm text-gray-400">
              JSYK by{" "}
              <a
                href="https://x.com/monaski_"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                monaski
              </a>
            </p>
          </div>

          {/* <SocialShareButtons messageId={messageId} /> */}
        </div>
      </FadeIn>

      {/* Action modal */}
      <ActionModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        warning="Are you sure you want to delete this message"
        header="Delete message"
        btnAction="Delete"
        loading={loadingDelete}
        handleAction={handleDelete}
      />
    </div>
  );
};

export default ViewMessage;
