import toast from "react-hot-toast";

interface ShareProps {
  messageId: string;
}

const SocialShareButtons = ({ messageId }: ShareProps) => {
  if (!messageId) return;

  const handleShare = async (platform: "whatsapp" | "twitter" | "facebook") => {
    try {
      const sharePageUrl = `${import.meta.env.VITE_API_BASE_URL}/image/share/${messageId}`;
      const text = "Send me anonymous message 🤫🌚";

      const encodedImageUrl = encodeURIComponent(sharePageUrl);
      const encodedText = encodeURIComponent(text);

      let shareUrl;

      switch (platform) {
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodedText}%20${encodedImageUrl}`;
          break;

        case "twitter":
          shareUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedImageUrl}`;
          break;

        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedImageUrl}`;
          break;
      }

      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Sharing failed:", err);
      toast.error("Failed to share. Try again later.");
    }
  };

  return (
    <div className="flex items-center flex-col my-6">
      <p className="text-sm text-gray-700 pb-2">Share to</p>
      <div className="flex items-center max-w-max bg-gray-100 rounded-3xl gap-3 p-3 shadow-sm">
        <button
          onClick={() => handleShare("whatsapp")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
        >
          <img
            src="/whatsapp.png"
            alt="whatsapp"
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
        >
          <img
            src="/twitter.png"
            alt="twitter"
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300"
        >
          <img
            src="/facebook.png"
            alt="facebook"
            className="w-8 h-8 sm:w-12 sm:h-12"
          />
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
