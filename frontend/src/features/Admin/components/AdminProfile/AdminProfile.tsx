import { APP_CONFIG } from "@/shared/constants/config";
import { useAuth } from "@/context/AuthContext";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-white w-full max-w-md max-h-max p-4 sm:p-6 rounded-xl shadow">
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

      

      

    </div>
  );
};

export default AdminProfile;
