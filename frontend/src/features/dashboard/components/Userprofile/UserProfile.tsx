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
    <div className="workspace-panel profile-panel">
      <div className="profile-panel-head">
        <img
          src={user?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
          alt="profile"
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover object-center"
        />
        <div className="flex flex-col flex-grow min-w-0">
          <h2>
            {user?.username || "loading..."}
          </h2>
          <div className="profile-link">
            <p>{`jsyk/u/${user?.jsykLink}` || "loading..."}</p>
            <button
              onClick={() => copyToClipboard(`u/${user?.jsykLink}`)}
              title="copy link"
              className="text-gray-400 hover:text-gray-800 cursor-pointer active:scale-[0.90] transition-all outline-0"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="profile-views">
        <div className="flex items-center gap-2">
          <Eye size={20} />
          <p>Profile views today</p>
        </div>
        <strong>{user?.profileViews || "0"}</strong>
      </div>

      <p>
        Click on a card to create preferred anonymous link
      </p>

      <ActionButtons
        onCopy={() => copyToClipboard(`m/${user?.jsykLink}`)}
        onCreateWithTopic={() => navigate("/new-topic")}
      />
    </div>
  );
};

export default UserProfile;
