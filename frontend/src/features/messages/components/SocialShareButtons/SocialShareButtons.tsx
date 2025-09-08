
interface ShareProps {
  messageId: string;
}

const SocialShareButtons = ({ messageId }: ShareProps) => {
  if (!messageId) return;
  const url = `${import.meta.env.VITE_API_BASE_URL}/image/share/${messageId}`;
  const text = "send me anonymous message";

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const handleShare = (platform: "whatsapp" | "twitter" | "facebook") => {
    let shareUrl;

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;

      case "twitter":
        shareUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;

      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return(
    <div className="flex items-center flex-col my-6">
      <p className="text-sm text-gray-700 pb-2">Share to</p>
      <div className="flex items-center max-w-max bg-gray-100 rounded-3xl gap-3 p-3 shadow-sm">
        <button
          onClick={() => handleShare("whatsapp")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <img src="/whatsapp.png" alt="whatsapp" className="w-8 h-8 sm:w-12 sm:h-12" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <img src="/twitter.png" alt="twitter" className="w-8 h-8 sm:w-12 sm:h-12" />
        </button>
        <button
          onClick={() => handleShare("facebook")}
          className="bg-gray-200 rounded-full p-1 hover:scale-105 active:scale-95 cursor-pointer transition-all hover:bg-gray-300">
          <img src="/facebook.png" alt="facebook" className="w-8 h-8 sm:w-12 sm:h-12" />
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
