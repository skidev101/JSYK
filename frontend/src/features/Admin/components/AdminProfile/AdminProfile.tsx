import { APP_CONFIG } from "@/shared/constants/config";
import { useAuth } from "@/context/AuthContext";
import { MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-full">
          <img
            src={user?.profileImgUrl || APP_CONFIG.DEFAULT_AVATAR}
            alt="profile"
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover object-center"
          />
          <div className="flex flex-col flex-grow">
            <h1 className="text-md text-gray-700">Welcome back</h1>
            <h1 className="text-lg sm:text-xl font-bold">
              {user?.username || "loading..."}
            </h1>
          </div>
        </div>

        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              navigate("/admin/feature-requests");
            }}
            className="flex items-center gap-2 p-2 rounded-xl bg-gray-100 border border-purple-300 hover:cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircleHeart size={20} className="text-purple-400" />
            {/* <p>Request feature</p> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
