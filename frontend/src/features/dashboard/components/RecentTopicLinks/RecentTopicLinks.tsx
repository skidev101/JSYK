import { copyToClipboard } from "@/shared/utils/clipboard";
import { Copy, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Topic } from "@/store/dashboardStore";
import { UI_CONSTANTS } from "@/shared/constants/UIConstants";

interface RecentTopicLinksProps {
  groupedTopicLinks: Record<string, Topic[]>;
}

const RecentTopicLinks = ({ groupedTopicLinks }: RecentTopicLinksProps) => {
  const navigate = useNavigate();

  return (
    <section className="min-w-0 border border-[#d9dcd4] bg-[#fffefa] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[#d9dcd4] pb-4">
        <div className="flex items-center gap-2">
          <Link2 size={17} className="text-[#e86b3c]" />
          <h2 className="text-sm font-semibold tracking-[-0.02em]">Recent topics</h2>
        </div>

        {Object.keys(groupedTopicLinks).length > 0 && (
          <button
            onClick={() => navigate("/topics")}
            className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#275d49] hover:underline"
          >
            see all
          </button>
        )}
      </div>

      {Object.keys(groupedTopicLinks).length > 0 &&
        Object.entries(groupedTopicLinks).map(([date, links]) => (
          <div key={date}>
            <p className="mb-1 mt-4 font-mono text-[9px] uppercase tracking-[0.08em] text-[#8a928b]">
              {date}
            </p>
            {links.map((link) => (
              <div
                key={link._id}
                className="flex min-w-0 items-center gap-3 border-t border-[#e2e4de] py-3"
              >
                <div className="min-w-0 flex-1">
                  <div>
                    {/* <Link2 size={18} /> */}
                    <p className="truncate text-xs text-[#4f5751]">{link.url}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`m/${link.url}`)}
                  title="Copy topic link"
                  className="grid h-8 w-8 shrink-0 place-items-center border border-[#d9dcd4] text-[#6e766f] transition hover:border-[#275d49] hover:text-[#275d49] active:scale-95"
                >
                  <Copy size={UI_CONSTANTS.ICON_SIZES.MEDIUM} />
                </button>
              </div>
            ))}
          </div>
        ))}

      {Object.keys(groupedTopicLinks).length === 0 && (
          <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-[#d9dcd4] bg-[#f8f7f2] px-5 py-8 text-center">
            <span className="mb-4 grid h-10 w-10 place-items-center border border-[#d9dcd4] bg-[#fffefa] text-[#e86b3c]"><Link2 size={18} /></span>
            <h2 className="text-sm font-semibold">
              No topics yet
            </h2>
            <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#707871]">
              Create a focused link to start a new conversation.
            </p>
            <button
              onClick={() => navigate("/new-topic")}
              className="mt-5 inline-flex h-9 items-center justify-center bg-[#275d49] px-4 text-xs font-semibold text-white transition hover:bg-[#1d4435] active:translate-y-px"
            >
              Create New topic
            </button>
          </div>
      )}
    </section>
  );
};

export default RecentTopicLinks;
