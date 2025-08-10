import { MessageCircle, Send, Share2 } from "lucide-react";

interface ShareProps {
  url: string;
  text: string;
}

const SocialShareButtons = ({ url, text }: ShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const handleShare = (platform: "whatsapp" | "twitter" | "facebook") => {
    let shareUrl;

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;

      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;

      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return(
    <div className="flex items-center flex-col mt-5">
      <p className="text-sm text-gray-700 pb-2">Share to</p>
      <div className="flex items-center max-w-max bg-gray-100 rounded-3xl gap-3 p-3 shadow-sm">
        <button
          onClick={() => handleShare("whatsapp")}
          className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <MessageCircle size={25} />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <Send size={25} />
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="bg-gray-200 rounded-full p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <Share2 size={25} />
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
