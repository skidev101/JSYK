  import { useState } from "react";
  import {
    LogOut,
    UserCircle2,
    User2,
    MessageCircle,
    Plus,
    Copy,
  } from "lucide-react";
  import ProfileDrawer from "../components/ProfileDrawer";
  import MessageCard from "../components/MessageCard";
  import { FadeDown } from "../components/MotionWrappers";
  import CreateTopicModal from "../components/CreateTopicModal";
  import LogoutModal from "../components/LogoutModal";

  const Dashboard = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showTopicModal, setShowTopicModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
      <div className="w-full min-h-screen">
        <header className="fixed top-0 z-50 w-full flex items-center justify-between shadow-md p-4 backdrop-blur-md rounded-b-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">JSYK</h1>

          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-200 flex items-center justify-center hover:bg-gray-400 transition duration-200"
            >
              <User2
                size={26}
                className="text-gray-800 px-0.5 hover:cursor-pointer active:scale-[0.95]"
              />
            </button>

            <div
              onClick={() => setShowLogoutModal((prev) => !prev)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center hover:bg-gray-200 transition duration-200"
            >
              <LogOut
                size={26}
                className="text-red-700 px-0.5 hover:cursor-pointer active:scale-[0.95]"
              />
            </div>
          </div>
        </header>

        <ProfileDrawer
          show={showProfile}
          onClose={() => setShowProfile((prev) => !prev)}
          username="ski101"
          email="skidev101@gmail.com"
          bio="Just a chill guy but if u play with me, you won't like it. i love chess football and others. I LOVE GOD"
        />

        <div className="relative flex justify-between flex-col bg-gray-300 md:flex-row w-full gap-5 rounded-xl mt-20 p-2 pt-4 sm:mt-20 sm:p-6">
          <FadeDown>
            <div className="sticky top-20 flex flex-col bg-white w-full max-w-lg p-4 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 w-full rounded-lg">
                <UserCircle2 size={25} />
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl font-bold">@ski101</h1>
                  <p className="text-sm sm:text-base text-gray-800">
                    skidev101@gmail.com
                  </p>
                </div>
              </div>

              <p className="pt-2 text-sm sm:text-base text-gray-700">
                Click on a card to create preferred anonymous link
              </p>

              <div className="flex items-center flex-col sm:justify-evenly sm:flex-row gap-3 my-2">
                <button
                  type="button"
                  className="flex items-center justify-center flex-col w-full sm:w-50 sm:h-50 p-4 sm:p-4 rounded-xl sm:rounded-4xl hover:scale-[1.01]  bg-emerald-500 hover:bg-emerald-300 active:scale-[0.95] active:bg-emerald-600 transition duration-300 cursor-pointer"
                >
                  <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                    Copy anon link with image
                  </p>
                  <Copy size={35} className="text-white" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowTopicModal((prev) => !prev)}
                  className="flex items-center justify-center flex-col w-full sm:w-50 sm:h-50 p-4 rounded-xl sm:rounded-4xl hover:scale-[1.01] bg-pink-500 hover:bg-pink-300 active:scale-[0.95] active:bg-pink-600 transition duration-300 cursor-pointer"
                >
                  <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                    Create anon link with topic
                  </p>
                  <Plus size={35} className="text-white" />
                </button>
              </div>
            </div>
          </FadeDown>

          <CreateTopicModal
            isOpen={showTopicModal}
            onClose={() => setShowTopicModal((prev) => !prev)}
          />

          <LogoutModal
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal((prev) => !prev)}
          />

          <div className="bg-white rounded-xl p-4 sm:p-5 sm:w-full">
            <FadeDown>
              <div className="flex items-center gap-1 pb-1.5">
                <MessageCircle size={20} />
                <h1 className="text-lg sm:text-xl">Messages</h1>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg bg-gray-200 gap-2 p-2 sm:p-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <MessageCard
                    key={i}
                    username="ethan"
                    topic="JSYK"
                    message="stuffs always happens. did u know that?"
                    link="https://jsyk.vercel.app"
                  />
                ))}
              </div>
            </FadeDown>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
