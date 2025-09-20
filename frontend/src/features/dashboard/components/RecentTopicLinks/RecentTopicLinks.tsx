import { copyToClipboard } from "@/shared/utils/clipboard";
import { Copy, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Topic } from "@/store/dashboardStore";
import { UI_CONSTANTS } from "@/shared/constants/UIConstants";
import Card from "@/shared/components/Card";
import OpenBoxIcon from "@/shared/components/UI/OpenBoxIcon";

interface RecentTopicLinksProps {
  groupedTopicLinks: Record<string, Topic[]>;
}

const RecentTopicLinks = ({ groupedTopicLinks }: RecentTopicLinksProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-1 ml-1">
          <Link2 size={UI_CONSTANTS.ICON_SIZES.LARGE} />
          <h1 className="text-lg sm:text-xl rounded-xl">Recent topics</h1>
        </div>

        {Object.keys(groupedTopicLinks).length > 0 && (
          <button
            onClick={() => navigate("/topics")}
            className="text-xs px-2 py-1 hover:bg-gray-100 text-gray-700 rounded-md transition-all active:scale-95 cursor-pointer outline-0"
          >
            see all
          </button>
        )}
      </div>

      {Object.keys(groupedTopicLinks).length > 0 &&
        Object.entries(groupedTopicLinks).map(([date, links]) => (
          <div key={date}>
            <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">
              {date}
            </p>
            {links.map((link) => (
              <div
                key={link._id}
                className="relative flex justify-between items-center w-full text-gray-700 bg-gray-100 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden"
              >
                <div className="w-full pr-8">
                  <div className="flex items-center gap-2">
                    {/* <Link2 size={18} /> */}
                    <p className="text-sm sm:text-base truncate">{link.url}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(`m/${link.url}`)}
                  className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300"
                >
                  <Copy size={UI_CONSTANTS.ICON_SIZES.MEDIUM} />
                </button>
              </div>
            ))}
          </div>
        ))}

      {Object.keys(groupedTopicLinks).length === 0 && (
        <Card>
          <div className="flex flex-col items-center justify-center text-center px-6 py-2">
            <OpenBoxIcon size={120} />
            <h2 className="text-lg font-semibold text-gray-700">
              No topics yet
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mt-2">
              Create an anonymous link to see topics here
            </p>
            <button
              onClick={() => navigate("/new-topic")}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
            >
              Create New topic
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RecentTopicLinks;
