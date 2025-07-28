import { useNavigate, useParams } from "react-router-dom";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { copyToClipboard } from "@/shared/utils/clipboard/clipboard";

interface userProfileData {
  username: string;
  profileImgUrl?: string;
  somethingLink: string;
  bio?: string;
  profileSlug: string;
}

const UserProfile = () => {
  const { profileSlug } = useParams();
  const [userProfile, setUserProfile] = useState<userProfileData | null>(null);
  const navigate = useNavigate();

  const handleCopy = async (url: string) => {
    const success = await copyToClipboard(`https://something.me/${url}`);
    if (success) {
      toast.success("Copied!");
    } else {
      toast.error("Error copying");
    }
  };

  useEffect(() => {
    if (!profileSlug) return;
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/profile/${profileSlug}`
        );
        setUserProfile(response.data.data);
      } catch (err: any) {
        console.log("Error fetching user profile:", err);
        toast.error(err.message);
      }
    };
    fetchUserProfile();
  }, [profileSlug]);

  return (
    <FadeIn>
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl p-4 bg-white shadow-xl border border-gray-100">
          <img
            src="/form.webp"
            alt="user"
            className="w-26 h-26 rounded-full object-cover p-1.5 border border-gray-200"
          />
          <h1 className="text-xl font-semibold mt-2">
            {userProfile?.username}
          </h1>
          <p className="text-sm text-gray-700 bg-gray-100 max-w-max px-3 py-1 sm:px-4  rounded-full">
            {`something.com/${userProfile?.profileSlug}`}
          </p>
          <p className="text-sm text-gray-700 bg-gray-100 text-center max-w-max px-3 py-2 mt-1 sm:px-3 sm:py-2 rounded-lg">
            {userProfile?.bio}
          </p>
          <div className="flex items-center gap-2 w-full mt-5">
            <button
              onClick={() => handleCopy(`${profileSlug}`)}
              className="flex flex-1/2 justify-center items-center gap-2 bg-gray-100 text-gray-800 rounded-full px-3 py-2 text:sm sm:text-base cursor-pointer transition-all active:scale-95"
            >
              Copy profile
            </button>
            <button
              onClick={() => navigate(`/m/${profileSlug}`)}
              className="flex flex-1/2 justify-center items-center bg-blue-500 hover:bg-blue-400 text-white rounded-full px-3 py-2 text:sm sm:text-base cursor-pointer transition-all active:scale-95"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default UserProfile;
