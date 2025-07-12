import { useState } from "react";
import { MessageCircle, Plus, Copy, Link, Loader2 } from "lucide-react";
import MessageCard from "../components/MessageCard";
import { FadeDown } from "../components/MotionWrappers";
import CreateTopicModal from "../components/CreateTopicModal";
import { useAuth } from "../context/AuthContext";
import { useDashboardData } from "../hooks/useDashboardData";
import { groupLinksByDate } from "../utils/groupByDate";


const Dashboard = () => {
  const { user, firebaseUser } = useAuth();
  const { data, loading, error } = useDashboardData(firebaseUser);
  console.log('data at dashboard:', data)
  const [showTopicModal, setShowTopicModal] = useState(false);
  
  if (loading) return <Loader2 size={40} className="animate-spin mt-50 mr-4" />;
  if (error) return <div className="mt-50 mr-4 p-4 text-red-500">Error loading dashboard</div>;

  const groupedLinks = groupLinksByDate(data.recentLinks);
  console.log('grouped links:', groupedLinks);
  const messages = data.messages;
  console.log('user messages:', messages);

  return (
    <section>
      <div className="w-full min-h-screen">
        <div className="relative flex justify-between flex-col bg-gray-300 md:flex-row w-full gap-5 rounded-xl mt-20 p-2 pt-4 sm:mt-20 sm:p-6">
          <FadeDown>
            <div className="flex flex-col sm:justify-between gap-2">
              <div className="flex flex-col bg-white w-full max-w-lg p-4 sm:p-6 rounded-xl">
                <div className="flex items-center gap-2 w-full rounded-lg">
                  <img
                    src={user?.profileImgUrl || "/default-pfp.webp"}
                    alt="profile"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover object-center"
                  />
                  <div className="flex flex-col w-full">
                    <h1 className="text-lg sm:text-xl font-bold">
                      {user?.username}
                    </h1>
                    <div className="flex justify-between items-center w-full text-sm sm:text-base text-gray-700 hover:text-gray-900 ">
                      <p>{`jsyk.com/${user?.jsykLink}`}</p>
                      <Copy
                        size={18}
                        className="text-gray-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <p className="pt-2 text-sm sm:text-base text-gray-700">
                  Click on a card to create preferred anonymous link
                </p>

                <div className="flex items-center flex-col sm:justify-evenly sm:flex-row gap-3 my-2">
                  <button
                    type="button"
                    className="flex items-center justify-center flex-col w-full shadow-md sm:w-50 sm:h-30 p-4 sm:p-4 rounded-lg sm:rounded-2xl hover:scale-[1.01] bg-emerald-500 hover:bg-emerald-300 active:scale-[0.95] active:bg-emerald-600 transition duration-300 cursor-pointer"
                  >
                    <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                      Copy anon link with image
                    </p>
                    <Copy size={20} className="text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowTopicModal((prev) => !prev)}
                    className="flex items-center justify-center flex-col w-full shadow-md sm:w-50 sm:h-30 p-4 rounded-lg sm:rounded-2xl hover:scale-[1.01] bg-pink-500 hover:bg-pink-300 active:scale-[0.95] active:bg-pink-600 transition duration-300 cursor-pointer"
                  >
                    <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                      Create anon link with topic
                    </p>
                    <Plus size={20} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="flex mt-2 flex-col bg-white w-full p-4 sm:p-6 rounded-xl">
                <h1 className="block text-lg sm:text-xl">Recent links</h1>
                {/* Recent Links */}
                {Object.entries(groupedLinks).map(([date, links]) => (
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
                          <Link size={18} />
                          <p className="text-sm sm:text-base">{link.url}</p>
                        </div>
                        <button className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
                          <Copy size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}

                {/* {Object.entries(groupedLinks).map(([date, links]) => {
                  <div key={date}>
                     <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl">
                      {date}
                    </p>
                    <div className="relative flex justify-between items-center w-full text-gray-700 bg-gray-100 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2">
                        <Link size={18} />
                        <p className="text-sm sm:text-base">
                          https://jsyk.vercel.app
                        </p>
                      </div>
                      <button className="absolute right-2 w-8 h-8 sm:w-9 sm:h-9 grid place-items-center bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 hover:scale-[1.01] active:scale-[0.97] transition duration-150">
                        <Copy size={18} />
                      </button>
                    </div>
                
                  </div>
                })} */}
              </div>
            </div>
          </FadeDown>

          <CreateTopicModal
            isOpen={showTopicModal}
            onClose={() => setShowTopicModal((prev) => !prev)}
          />

          <div className="bg-white rounded-xl p-4 sm:p-5 sm:w-full md:max-h-[100vh] md:overflow-y-auto">
            <FadeDown>
              <div className="flex items-center gap-1 pb-1.5">
                <MessageCircle size={20} />
                <h1 className="text-lg sm:text-xl">Messages</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg bg-gray-200 gap-2 p-2 sm:p-4">
                 {messages.length === 0 ? (
                  <p className="text-sm text-gray-500">No messages yet.</p>
                ) : (
                  messages.map((message) => (
                    <MessageCard
                      key={message._id}
                      username={user?.username || "Anonymous"}
                      topic={message.topic || "No Topic"}
                      message={message.content}
                    />
                  ))
                )}
              </div>
            </FadeDown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
