import { Copy, Eye } from "lucide-react";
import { APP_CONFIG } from "@/shared/constants/config";
import ActionButtons from "./ActionButtons";
import { useAuth } from "@/context/AuthContext";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 w-full">
        <img
          src={user?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
          alt="profile"
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover object-center"
        />
        <div className="flex flex-col flex-grow">
          <h1 className="text-lg sm:text-xl font-bold">
            {user?.username || "loading..."}
          </h1>
          <div className="flex justify-between items-center w-full text-sm sm:text-base text-gray-600 hover:text-gray-900 truncate">
            <p>{`${APP_CONFIG.BASE_URL}/${user?.jsykLink}` || "loading..."}</p>
            <button
              onClick={() => copyToClipboard(`${user?.jsykLink}`)}
              title="copy link"
              className="text-gray-400 hover:text-gray-800 cursor-pointer active:scale-[0.90] transition-all"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded-lg mt-2 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Eye size={20} />
          <p>Profile views today</p>
        </div>
        <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-lg">
          <p className="text-gray-800">{user?.profileViews || "0"}</p>
        </div>
      </div>

      <p className="pt-2 text-sm sm:text-base text-gray-700">
        Click on a card to create preferred anonymous link
      </p>

      <ActionButtons
        onCopy={() => copyToClipboard(`m/${user?.jsykLink}`)}
        onCreateWithTopic={() => navigate("/dashboard/new-topic")}
      />
    </div>
  );
};

export default UserProfile;
