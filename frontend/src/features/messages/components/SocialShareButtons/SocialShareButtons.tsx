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

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleShare("whatsapp")}
        className="text-green-500 hover:opacity-80 p-2 rounded-full border border-green-500"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare("twitter")}
        className="text-blue-400 hover:opacity-80 p-2 rounded-full border border-blue-400"
        title="Share on Twitter"
      >
        <Send className="w-5 h-5" />
      </button>

      <button
        onClick={() => handleShare("facebook")}
        className="text-blue-600 hover:opacity-80 p-2 rounded-full border border-blue-600"
        title="Share on Facebook"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SocialShareButtons;
