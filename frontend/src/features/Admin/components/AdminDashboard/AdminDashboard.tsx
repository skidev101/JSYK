import { FadeDown, FadeLeft } from "@/shared/components/Motion";
import AdminProfile from "../AdminProfile";
import Analytics from "../Analytics/Analytics";
import ActivityGraph from "../MessageActivityGraph";
import UsersActivityGraph from "../UsersActivityGraph";

const AdminDashboard = () => {
  return (
    <div className="mt-16 mb-8 flex flex-col md:flex-row gap-3 p-2 sm:p-4 rounded-md bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="flex flex-col gap-2 sm:max-w-md w-full">
        <FadeLeft>
          <AdminProfile />
        </FadeLeft>
        <FadeDown>
          <ActivityGraph />
        </FadeDown>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <FadeDown>
            <Analytics />
          </FadeDown>
        </div>

        <div className="w-full">
          <FadeDown>
            <UsersActivityGraph />
          </FadeDown>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
