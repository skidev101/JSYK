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
    <section className="min-w-0 border border-[#d9dcd4] bg-[#fffefa] p-5">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={user?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
          alt="profile"
          className="h-11 w-11 shrink-0 rounded-full border border-[#d9dcd4] object-cover"
        />
        <div className="flex flex-col flex-grow min-w-0">
          <h2 className="truncate text-base font-semibold tracking-[-0.03em]">
            {user?.username || "loading..."}
          </h2>
          <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
            <p className="truncate font-mono text-[10px] text-[#7b837c]">{`jsyk/u/${user?.jsykLink}` || "loading..."}</p>
            <button
              onClick={() => copyToClipboard(`u/${user?.jsykLink}`)}
              title="copy link"
              className="shrink-0 text-[#7b837c] transition hover:text-[#275d49] active:scale-95"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="my-5 flex items-center justify-between border-y border-[#d9dcd4] py-3 text-xs text-[#707871]">
        <div className="flex items-center gap-2">
          <Eye size={16} />
          <p>Profile views today</p>
        </div>
        <strong className="font-mono text-sm text-[#1f2421]">{user?.profileViews || "0"}</strong>
      </div>

      <p className="mb-4 text-xs leading-5 text-[#707871]">
        Share your general link, or create a focused topic for better replies.
      </p>

      <ActionButtons
        onCopy={() => copyToClipboard(`m/${user?.jsykLink}`)}
        onCreateWithTopic={() => navigate("/new-topic")}
      />
    </section>
  );
};

export default UserProfile;
