import { Copy, Eye } from "lucide-react";
// import type { User } from "@/shared/types/userTypes";
import { APP_CONFIG } from "@/shared/constants/config";
import { UI_CONSTANTS } from "@/shared/constants/ui.constants";
import ActionButtons from "./ActionButtons";
import { useAuth } from "@/context/AuthContext";

interface UserProfileProps {
  // user: User | null; // remember to change from null
  onCopyLink?: () => void;
  onCopyWithImage?: () => void;
  onCreateWithTopic?: () => void;
}

const UserProfile = ({
  // user,
  onCopyLink,
  onCreateWithTopic,
  onCopyWithImage,
}: UserProfileProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 w-full rounded-lg">
        <img
          src={user?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
          alt="profile"
          className={`${UI_CONSTANTS.AVATAR_SIZES.SMALL} ${UI_CONSTANTS.AVATAR_SIZES.MEDIUM}`} //still check this later
        />
        <div className="flex flex-col w-full">
          <h1 className="text-lg sm:text-xl font-bold">
            {user?.username || "loading..."}
          </h1>
          <div className="flex justify-between items-center w-full text-sm sm:text-base text-gray-700 hover:text-gray-900 truncate">
            <p>
              {`${APP_CONFIG.BASE_URL}/${user?.somethingLink}` || "loading..."}
            </p>
            <button
              onClick={onCopyLink}
              title="copy link"
              className="text-gray-500 cursor-pointer active:scale-[0.90] transition-all"
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
          <p>2</p>
        </div>
      </div>

      <p className="pt-2 text-sm sm:text-base text-gray-700">
        Click on a card to create preferred anonymous link
      </p>

      <ActionButtons
        onCopyWithImage={onCopyWithImage}
        onCreateWithTopic={onCreateWithTopic}
      />
    </div>
  );
};

export default UserProfile;
