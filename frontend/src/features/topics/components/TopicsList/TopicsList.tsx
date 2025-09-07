import { ChevronRight, Loader2, MessageCircleCode, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { groupTopicsByDate } from "@/shared/utils/groupTopicsByDate";
// import { HashLoader } from "react-spinners";
import ErrorState from "@/shared/components/UI/ErrorBoundary";
import { FadeDown } from "@/shared/components/Motion";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const TopicsList = () => {
  const { user } = useAuth();
  const { data, loadingData, loadMore, error, refetch } = useDashboardData();
  const navigate = useNavigate();
  const groupedTopics = groupTopicsByDate(data.topics);
  console.log("grouped topics:", groupedTopics);

  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (!data.topics.length) {
        refetch();
      }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !loadingData &&
          data.pagination?.hasNextPage
        ) {
          const nextPage = page + 1;
          loadMore(nextPage, "");
          setPage(nextPage);
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [page, loadingData]);

  // if (loadingData) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[100vh] p-8">
  //       <HashLoader size={40} color="#000" />
  //     </div>
  //   );
  // }
  
  if (data.topics.length !== 0) { // change back to ===
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[100vh] px-8">
        <img
          src="/box.png"
          alt="No links"
          className="w-36 h-36 mb-4 opacity-80"
        />
        <h2 className="text-lg font-semibold text-gray-700">No topics yet</h2>
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
      <div className="w-full h-full min-h-screen mt-16 pt-3 ">
        <div className="flex items-center w-full flex-col">
          <div className="w-full max-w-4xl ">
            <div className="flex justify-between items-center w-full px-2">
              <div>
                <h1 className="text-xl sm:text-2xl bg-white max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-200">
                  Your Topics
                </h1>
                <p className="text-sm text-gray-700 bg-gray-100 max-w-max px-3 py-1 mt-2 sm:px-4 rounded-xl ">
                  Topics with images will be automatically deleted in 15 days to
                  save storage
                </p>
              </div>
              {/* <button
                  onClick={() => refetch()}
                  className="bg-gray-100 rounded-full p-2 text-gray-700 font-bold cursor-pointer transition-all active:scale-95"
                >
                  <RefreshCcw
                    size={18}
                    className={loadingData ? "animate-spin" : ""}
                  />
                </button> */}
            </div>
            <div className="w-full rounded-2xl p-4 border-1 border-gray-100 shadow-md mt-5 bg-white">
              {Object.entries(groupedTopics).map(([date, topics]) => (
                <div key={date} className="mb-5">
                  <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-100">
                    {date}
                  </p>
                  {topics.map((topic) => (
                    <div
                      key={topic._id}
                      onClick={() =>
                        navigate(`/topic/${topic.topicId}/messages`)
                      }
                      className="relative flex justify-between items-center w-full bg-gray-50 hover:bg-gray-100 hover:cursor-pointer hover:shadow-sm transition-all duration-200 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden border border-gray-200 active:scale-99"
                    >
                      <div className="flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <Tag size={18} className="text-gray-400 shrink-0" />
                          <p className="text-md text-gray-800">{topic.topic}</p>
                          {/* <Copy size={14} className="text-gray-500 ml-2 hover:cursor-pointer"/> */}
                        </div>

                        <div className="flex items-center gap-2">
                          <MessageCircleCode
                            size={15}
                            className="text-gray-400"
                          />
                          <p className="text-sm text-gray-700">
                            {topic.messageCount} messages
                          </p>
                        </div>
                      </div>
                      <span className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300">
                        <ChevronRight size={17} className="text-gray-700" />
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              <div ref={loaderRef} className="flex justify-center p-4">
                {loadingData && (
                  <Loader2 size={25} className="animate-spin text-blue-500" />
                )}
                {!data.pagination?.hasNextPage && !loadingData && (
                  <span className="text-sm text-gray-700">
                    No more topics
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeDown>
  );
};

export default TopicsList;
