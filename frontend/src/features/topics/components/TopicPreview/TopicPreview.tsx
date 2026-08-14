import { useAuth } from "@/context/AuthContext";
import MessageCard from "@/shared/components/Message/MessageCard";
import { FadeDown } from "@/shared/components/Motion/MotionWrappers";
import { APP_CONFIG } from "@/shared/constants/config";
import { toSlug } from "@/shared/utils/slugify";
import { EllipsisVertical, Home, Palette } from "lucide-react";

interface TopicPreviewProps {
  topic: string;
  themeColor: string;
  topicImgPreviews?: string[];
}

const TopicPreview = ({
  topic,
  themeColor,
  topicImgPreviews,
}: TopicPreviewProps) => {
  const { user } = useAuth();

  return (
    <section className="min-w-0 border border-[#d9dcd4] bg-[#e9eee8] p-5 sm:p-7">
      <FadeDown>
        <div>
          <div className="mb-7 flex items-center justify-between border-b border-[#cfd6cd] pb-5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-[#cfd6cd] bg-[#fffefa] text-[#e86b3c]"><Palette size={17} /></span>
              <div><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#7b837c]">Live preview</p><h2 className="mt-1 text-lg font-semibold tracking-[-0.04em]">Your message card</h2></div>
            </div>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.08em] text-[#8a928b] sm:block">Updates as you type</span>
          </div>

          <div className="flex min-h-[440px] items-center justify-center border border-[#d0d8cf] bg-[#f4f5ef] p-4 sm:p-8">
            <div className="w-full max-w-[390px] border border-[#d9dcd4] bg-[#fffefa] p-3 shadow-[8px_9px_0_rgba(39,93,73,0.08)] sm:p-4">
              <div className="mb-4 flex items-center gap-3 border-b border-[#e2e4de] pb-3">
                <Home size={16} className="shrink-0 text-[#707871]" />
                <div className="min-w-0 flex-1 border border-[#e2e4de] bg-[#f0f1eb] px-3 py-2">
                  <p className="truncate font-mono text-[10px] text-[#707871]">
                    {`${APP_CONFIG.BASE_URL}/${toSlug(topic)}`}
                  </p>
                </div>
                <EllipsisVertical size={16} className="shrink-0 text-[#707871]" />
              </div>
              <div className="w-full">
                <MessageCard
                  username={user?.username}
                  profileImgUrl={user?.profileImgUrl}
                  topic={topic}
                  topicImgUrls={topicImgPreviews}
                  preview={true}
                  inView={false}
                  themeColor={themeColor}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeDown>
    </section>
  );
};

export default TopicPreview;
