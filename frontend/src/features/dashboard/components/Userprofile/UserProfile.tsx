import { Copy } from "lucide-react";
import type { User } from "@/shared/types/userTypes";
import { APP_CONFIG } from "@/shared/constants/config";
import { UI_CONSTANTS } from "@/shared/constants/ui.constants";
import ActionButtons from "./ActionButtons";

interface UserProfileProps {
  user: User;
  onCopyLink: () => void;
  onCopyWithImage: () => void;
  onCreateWithTopic: () => void;
}

const UserProfile = ({
  user,
  onCopyLink,
  onCreateWithTopic,
  onCopyWithImage,
}: UserProfileProps) => {
  return (
    <div className="flex flex-col bg-white w-full max-w-md p-4 sm:p-6 rounded-xl">
      <div className="flex items-center gap-2 w-full rounded-lg">
        <img
          src={user.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
          alt="profile"
          className={`${UI_CONSTANTS.AVATAR_SIZES.SMALL} sm:${UI_CONSTANTS.AVATAR_SIZES.MEDIUM} rounded-full object-cover object-center`}
        />
        <div className="flex flex-col w-full">
          <h1 className="text-lg sm:text-xl font-bold">{user.username}</h1>
          <div className="flex justify-between items-center w-full text-sm sm:text-base text-gray-700 hover:text-gray-900 truncate">
            <p>{`${APP_CONFIG.BASE_URL}/${user.jsykLink}`}</p>
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


export default UserProfile