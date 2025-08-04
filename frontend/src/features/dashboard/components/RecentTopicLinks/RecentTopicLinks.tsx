import { copyToClipboard } from "@/shared/utils/clipboard";
import { Copy, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Topic } from "../../hooks/useDashboardData";

interface RecentTopicLinksProps {
  groupedTopicLinks: Record<string, Topic[]>;
}

const RecentTopicLinks = ({ groupedTopicLinks }: RecentTopicLinksProps) => {
  // const lastFiveTopics = groupedTopicLinks.slice(0, 5);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 py-2 ml-1">
          <Link2 size={20} />
          <h1 className="text-lg sm:text-xl rounded-xl">Recent Links</h1>
        </div>

        <button
          onClick={() => navigate("/topics")}
          className="text-sm px-2 py-1 hover:bg-gray-100 rounded-md transition-all active:scale-95 cursor-pointer"
        >
          see all
        </button>
      </div>

      {Object.entries(groupedTopicLinks).map(([date, links]) => (
        <div key={date}>
          <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">
            {date}
          </p>
          {links.map((link) => (
            <div
              key={link._id}
              className="relative flex justify-between items-center w-full text-gray-700 bg-gray-100 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <Link2 size={18} />
                <p className="text-sm sm:text-base">{link.url}</p>
              </div>
              <button
                onClick={() => copyToClipboard(link.url)}
                className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300"
              >
                <Copy size={18} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecentTopicLinks;
