import { FadeDown } from "@/shared/components/Motion";
import { useFeatureRequest } from "../../hooks/useFeatureRequest";
import { groupFeaturesByDate } from "@/shared/utils/groupFeaturesByDate";
import { HashLoader } from "react-spinners";
import ErrorState from "@/shared/components/UI/ErrorBoundary";

const FeatureRequestList = () => {
  const { data, loading, error } = useFeatureRequest(); // add loading and error

  console.log("data at feature requests list:", data);

  if (loading || data === null) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState message="An unknown error occured" src="/empty-box.png" />
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[100vh] px-8">
        <img
          src="/box.png"
          alt="No links"
          className="w-36 h-36 mb-4 opacity-80"
        />
        <h2 className="text-lg font-semibold text-gray-700">
          No requests yet...
        </h2>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
        >
          Go back
        </button>
      </div>
    );
  }

  const groupedFeatures = groupFeaturesByDate(data);

  return (
    <FadeDown>
      <div className="w-full h-full min-h-screen mt-16 pt-3 px-2 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100 relative overflow-hidden">
        <div className="flex items-center w-full flex-col">
          <div className="w-full max-w-3xl ">
            <div className="flex justify-between items-center w-full">
              <div>
                <h1 className="text-xl sm:text-2xl bg-white max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-200">
                  Feature requests
                </h1>
              </div>
            </div>

            <div className="w-full rounded-2xl p-4 border-1 border-gray-100 shadow-md mt-5 bg-white">
              {Object.entries(groupedFeatures).map(([date, features]) => (
                <div key={date} className="mb-5">
                  <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl border border-gray-100">
                    {date}
                  </p>
                  {features.map((feature) => (
                    <div
                      key={feature._id}
                      className="relative w-full bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 my-3 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">
                          @{feature.username}
                        </p>
                        <p className="text-xs text-gray-400">{feature.email}</p>
                      </div>

                      <p className="text-xs text-gray-400 mb-3">
                        {/* {new Date(feature.createdAt).toLocaleDateString()} ·{" "} */}
                        {new Date(feature.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>


                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {feature.content}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeDown>
  );
};

export default FeatureRequestList;
