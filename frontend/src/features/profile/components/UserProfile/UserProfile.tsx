import { useNavigate, useParams } from "react-router-dom";
import { FadeIn } from "@/shared/components/Motion/MotionWrappers";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { HashLoader } from "react-spinners";
import { APP_CONFIG } from "@/shared/constants/config";
import { motion } from "framer-motion";
import ErrorState from "@/shared/components/UI/ErrorBoundary";

const UserProfile = () => {
  const { profileSlug } = useParams();
  if (!profileSlug) return <div>Oops... that must be an error</div>;
  const navigate = useNavigate();
  const { userProfile, loading, error } = useFetchUserProfile(profileSlug); // add error
  console.log("userprofile:", userProfile);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[100vh] p-8">
        <HashLoader size={40} color="#000" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        message="An unknown error occured"
        src="/empty-box.png"
      />
    );
  }

  return (
    <FadeIn>
      <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* <div className="absolute inset-1 mesh-gradient"></div> */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="w-full max-w-[375px] h-full flex justify-center flex-col items-center gap-3 rounded-xl px-4 py-6 bg-white shadow-xl border border-gray-100">
          <img
            src={userProfile?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
            alt="user"
            className="w-26 h-26 rounded-full object-cover p-1.5 border border-gray-200"
          />
          <h1 className="text-xl font-semibold mt-2">
            {userProfile?.username}
          </h1>
          <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-2 py-1 sm:px-4 mb-2 rounded-full">
            {`${APP_CONFIG.BASE_URL}/${userProfile?.profileSlug}`}
          </p>
          <p className="text-sm text-gray-600 bg-gray-100 text-center max-w-max px-3 py-2 mb-5 sm:px-3 sm:py-2 rounded-lg">
            {userProfile?.bio || "No bio yet"}
          </p>
          <div className="flex items-center gap-2 w-full mt-5">
            <button
              onClick={() => copyToClipboard(`${profileSlug}`)}
              className="flex flex-1/2 justify-center items-center gap-2 bg-gray-100 text-gray-800 rounded-full px-3 py-2 text-sm sm:text-base cursor-pointer transition-all active:scale-95"
            >
              Copy profile
            </button>
            <motion.button
              onClick={() => navigate(`/m/${profileSlug}`)}
              whileHover={{ scale: 1.05 }}
              animate={{ x: [0, -3, 2, -3, 2, 0] }} // shake animation
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              className="flex justify-center items-center flex-1/2 py-2 text-sm sm:text-base font-medium text-white bg-gradient-to-r  to-blue-500 from-purple-400 rounded-full shadow-md hover:cursor-pointer"
            >
              Message
            </motion.button>
            {/* <button
              onClick={() => navigate(`/m/${profileSlug}`)}
              className="flex flex-1/2 justify-center items-center bg-blue-500 hover:bg-blue-400 text-white rounded-full px-3 py-2 text:sm sm:text-base cursor-pointer transition-all active:scale-95"
            >
              Message
            </button> */}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default UserProfile;
