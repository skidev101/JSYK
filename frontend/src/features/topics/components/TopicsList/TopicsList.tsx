import { copyToClipboard } from "@/shared/utils/clipboard";
import { Copy, Link2, MessageCircleCode, RefreshCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { groupTopicsByDate } from "@/shared/utils/groupTopicsByDate";
// import { HashLoader } from "react-spinners";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { FadeDown } from "@/shared/components/Motion";

const TopicsList = () => {
  const { topicId } = useParams();
  const { data, loadingData, error, refetch } = useDashboardData(); // add loading
  const navigate = useNavigate();
  const groupedTopics = groupTopicsByDate(data.topics);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[100vh] p-8">
  //       <HashLoader size={40} color="#000" />
  //       {/* <div className="text-lg">Loading dashboard...</div> */}
  //     </div>
  //   );
  // }
  if (!data.topics) {
    return (
      // <Error
      //   errorMessage="Create an anonymous link to see links here"
      //   imgSrc="/box.png"
      //   altText="error"
      //   imgStyles="w-35 h-35"
      //   clickAction={navigate("/new")}
      //   btnAction="Create New Link"
      // />
      <div className="flex flex-col items-center justify-center text-center py-10">
        <img
          src="/box.png"
          alt="No links"
          className="w-36 h-36 mb-4 opacity-80"
        />
        <h2 className="text-lg font-semibold text-gray-700">No links yet</h2>
        <p className="text-sm text-gray-500 max-w-xs mt-2">
          Create an anonymous link to see links here
        </p>
        <button
          onClick={() => navigate("/new")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
        >
          Create New Link
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message="An unknown error occured"
        src="/box.png"
        onRetry={refetch}
      />
    );
  }

  // const groupedTopics = groupTopicsByDate(data.topics);

  return (
    <FadeDown>
      <div className="flex items-center w-full flex-col">
        <div className="w-full max-w-4xl ">
          <div className="flex justify-between items-center w-full px-2 mt-20">
            <div>
              <h1 className="text-lg sm:text-2xl bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-200">
                Your Topics
              </h1>
              {/* <p className="text-sm bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">All Topics you have created</p> */}
            </div>
            <button
              onClick={() => refetch()}
              className="bg-gray-100 rounded-full p-2 text-gray-700 font-bold cursor-pointer transition-all active:scale-95"
            >
              <RefreshCcw
                size={18}
                className={loadingData ? "animate-spin" : ""}
              />
            </button>
          </div>
          <div className="w-full rounded-2xl p-4 border-1 border-gray-100 shadow-md mt-5">
            {/* {Object.entries(groupedTopics).map(([date, links]) => (
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
          ))} */}
            {Object.entries(groupedTopics).map(([date, topics]) => (
              <div key={date} className="mb-5">
                <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-100">
                  {date}
                </p>
                {topics.map((topic) => (
                  <div
                    key={topic._id}
                    onClick={() => navigate(`/topic/${topicId}/messages`)}
                    className="relative flex justify-between items-center w-full bg-gray-50 hover:bg-gray-100 hover:cursor-pointer hover:shadow-sm transition-all duration-200 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden border border-gray-200 active:scale-99"
                  >
                    <div className="flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <Link2 size={18} className="text-gray-500" />
                        <p className="text-lg text-gray-800">{topic.topic}</p>
                        {/* <Copy size={14} className="text-gray-500 ml-2 hover:cursor-pointer"/> */}
                      </div>

                      <div className="flex items-center gap-2">
                        <MessageCircleCode
                          size={15}
                          className="text-gray-500"
                        />
                        <p className="text-sm text-gray-700">
                          {topic.messageCount} messages
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard("linky")}
                      className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300"
                    >
                      <Copy size={17} className="text-gray-700" />
                    </button>
                  </div>
                ))}
              </div>
            ))}

            

          </div>
        </div>
      </div>
    </FadeDown>
  );
};

export default TopicsList;
