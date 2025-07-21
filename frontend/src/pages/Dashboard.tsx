import { useState } from "react";
import {
  MessageCircle,
  Plus,
  Copy,
  Link,
  Loader2,
  RefreshCcw,
  Link2,
  ChevronRight,
} from "lucide-react";
import MessageCard from "../components/MessageCard";
import { FadeDown } from "../components/MotionWrappers";
import { useAuth } from "../context/AuthContext";
import { useDashboardData } from "../hooks/useDashboardData";
import { groupLinksByDate } from "../utils/groupByDate";
import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "../utils/copyToClipboard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, firebaseUser } = useAuth();
  const { data, loading, error, refetch } = useDashboardData(firebaseUser);

  const [sortBy, setSortBy] = useState<'date' | 'topics'>('date');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTopicList, setShowTopicList] = useState(false);

  const navigate = useNavigate();
  const groupedLinks = groupLinksByDate(data.recentLinks);
  const messages = data.messages;

  const handleCopy = async (url: string) => {
    const success = await copyToClipboard(`https://hiii.me/${url}`); //remember to change
    if (success) {
      toast.success("Copied!");
    } else {
      toast.error("Error copying");
    }
  };

  return (
    <section>
      <div className="w-full min-h-screen">
        <div className="relative flex justify-between flex-col bg-gray-300 md:flex-row w-full gap-5 rounded-xl mt-20 p-2 pt-4 sm:mt-20 sm:p-6">
          <FadeDown>
            <div className="flex flex-col sm:justify-between gap-2">
              <div className="flex flex-col bg-white w-full max-w-md p-4 sm:p-6 rounded-xl">
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
                    <div className="flex justify-between items-center w-full text-sm sm:text-base text-gray-700 hover:text-gray-900 truncate">
                      <p>{`jsyk.com/${user?.jsykLink}`}</p>
                      <button
                        onClick={() => handleCopy(user?.jsykLink || 'hii')}
                        title="copy link"
                        className="text-gray-500 cursor-pointer active:scale-[0.90] transition-all"
                      >
                        <Copy size={18} />
                      </button>
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
                    onClick={() => navigate("/new")}
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 pb-1.5">
                    <Link2 size={20} />
                    <h1 className="text-lg sm:text-xl">Recent Topics</h1>
                  </div>
                  <button
                    onClick={() => navigate('/topics')}
                    className="flex items-center gap-1 text-sm px-2 py-1 hover:bg-gray-200 hover:text-blue-500 transition-all rounded-md cursor-pointer active:scale-95">
                    See all
                    <ChevronRight size={18} />
                  </button>
                </div>
                {/* Recent Links */}
                {loading ? (
                  <div className="flex justify-center items-center w-full">
                    <Loader2
                      size={30}
                      className="bg-transparent text-black animate-spin"
                    />
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center p-2 text-red-500">
                    <img
                      src="/error-404.png"
                      alt="No links"
                      className="w-36 h-36 mb-4 opacity-80"
                    />
                    <h2 className="text-lg font-semibold text-red-500">
                      An error occured
                    </h2>
                  </div>
                ) : Object.keys(groupedLinks).length === 0 ? (
                  <div className="flex flex-col items-center justify-center bg-gray-200 text-center py-10 rounded-md mt-2">
                    <img
                      src="/box.png"
                      alt="No links"
                      className="w-36 h-36 mb-4 opacity-80"
                    />
                    <h2 className="text-lg font-semibold text-gray-700">
                      No links yet
                    </h2>
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
                ) : (
                  Object.entries(groupedLinks).map(([date, links]) => (
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
                          <button
                            onClick={() => handleCopy(link.url)}
                            className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300"
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </FadeDown>

          <div className="bg-white rounded-xl p-4 sm:p-5 sm:w-full md:overflow-y-auto">
            <FadeDown>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 pb-1.5">
                  <MessageCircle size={20} />
                  <h1 className="text-lg sm:text-xl">Messages</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {/* <p><span>{messages.unreadCount}</span></p> */}
                  </div>
                </div>
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative flex items-center gap-1 bg-gray-200 rounded-full px-2 py-1 cursor-pointer hover:bg-gray-300 transition-all">
                  <p className="text-sm">Sort by</p>
                  <ChevronRight size={18} />

                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-md shadow z-10">
                      <div 
                        onClick={() => {
                          setSortBy('date');
                          setShowDropdown(false);
                          setShowTopicList(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Date
                      </div>
                      <div
                        onClick={() => {
                          setSortBy('topics');
                          setShowTopicList(true);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Topic
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={` ${
                  messages.length === 0
                    ? "flex flex-col items-center justify-center text-center"
                    : ""
                }grid grid-cols-1 lg:grid-cols-2 rounded-lg bg-gray-200 gap-2 p-2 sm:p-4`}
              >
                {loading ? (
                  <Loader2
                    size={30}
                    className="bg-transparent text-black animate-spin"
                  />
                ) : error ? (
                  <div className="w-full flex justify-center flex-col items-center p-4">
                    <p className="text-red-500">An unknown error occured</p>
                    <button onClick={() => refetch()} className="pt-4">
                      <RefreshCcw size={20} />
                    </button>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <img
                      src="/box.png"
                      alt="No links"
                      className="w-36 h-36 mb-4 opacity-80"
                    />
                    <h2 className="text-lg font-semibold text-gray-700">
                      No messages yet
                    </h2>
                    <p className="text-sm text-gray-500 max-w-xs mt-2">
                      Share your anonymous to get started
                    </p>
                    <button
                      onClick={() => handleCopy(user?.jsykLink || 'hii')}
                      className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
                    >
                      Share Link
                    </button>
                  </div>
                ) : (
                  messages.map((message) => (
                    <MessageCard
                      key={message._id}
                      messageId={message._id}
                      topic={message.topic}
                      message={message.content}
                      isRead={message.isRead}
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
