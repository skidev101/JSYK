import { useState } from "react";
import { LogOut, UserCircle2, User2, MessageCircle, Plus, Copy } from "lucide-react";
import ProfileDrawer from "../components/ProfileDrawer";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <header className="relative w-full flex items-center justify-between shadow-md p-4 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">JSYK</h1>

        <div className="flex items-center gap-4 sm:gap-8">
          <div
            onClick={() => setShowProfile((prev) => !prev)}
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition duration-200"
          >
            <User2
              size={26}
              className="text-gray-800 px-0.5 hover:cursor-pointer active:scale-[0.95]"
            />
          </div>
          <LogOut
            size={26}
            className="text-red-700 px-0.5 hover:cursor-pointer active:scale-[0.95]"
          />
        </div>
      </header>

      <ProfileDrawer
        show={showProfile}
        onClose={() => setShowProfile(false)}
        username="John Doe"
        email=""
      />

      <div className="flex items-center justify-between bg-gray-300 w-full gap-5 mt-6 p-2 sm:p-6">
        <div className="flex flex-col bg-white w-full max-w-md p-4 sm:p-6 rounded-xl">
          <div className="flex items-center gap-2 w-full rounded-lg">
            <UserCircle2 size={25} />
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold">@ski101</h1>
              <p className="text-sm sm:text-base text-gray-800">skidev101@gmail.com</p>
            </div>
          </div>
          <p className="pt-2 text-sm sm:text-base text-gray-700">
            Click on a card to create preferred anonymous link
          </p>
          <div className="flex items-center flex-col sm:flex-row gap-3 my-2">
            <button
              type="button"
              className="flex items-center justify-center flex-col w-full sm:w-50 sm:h-50 p-4 rounded-xl sm:rounded-4xl hover:scale-[1.01]  bg-emerald-500 hover:bg-emerald-300 hover:border active:scale-[0.95] active:bg-emerald-600 transition duration-300 cursor-pointer"
            >
              <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                Copy anon link with image
              </p>
              <Copy size={35} className="text-white" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center flex-col w-full sm:w-50 sm:h-50 p-4 rounded-xl sm:rounded-4xl hover:scale-[1.01] bg-pink-500 hover:bg-pink-300 hover:border active:scale-[0.95] active:bg-pink-600 transition duration-300 cursor-pointer"
            >
              <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
                Create anon link with topic
              </p>
              <Plus size={35} className="text-white" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 sm:w-full">
          <div className="flex items-center gap-1">
            <MessageCircle size={20} />
            <h1 className="text-lg sm:text-xl">Messages</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
