import Card from "@/shared/components/Card";
import { FadeIn } from "@/shared/components/Motion";
import { DatabaseZap, Globe, Loader2, MemoryStick, Tags, User, UserPlus } from "lucide-react";
import { useAdminAnalytics } from "../../hooks/useAdminAnalytics";
import { formatBytes } from "@/shared/utils/formatBytes";

const Analytics = () => {
  const { data, loading, error } = useAdminAnalytics();

  if (loading) return <Loader2 size={20} className="animate-spin" />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;


  return (
    <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4 shadow">
      <div className="flex items-center gap-1 py-1 ml-1 text-gray-700">
        <MemoryStick size={20} />
        <h1 className="text-lg sm:text-xl rounded-xl">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-2">
        <FadeIn delay={0.1}>
          <Card>
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
                <UserPlus size={21} />
              </div>
              <div className="flex flex-col">
                <p className="text-base text-gray-700">New Users today</p>
                <h1 className="text-xl font-black text-blue-600">{data.users.today}</h1>
              </div>
            </div>
          </Card>
        </FadeIn>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
              <User size={21} />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700">Total Users</p>
              <h1 className="text-xl font-black text-blue-600">{data.users.total}</h1>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
              <Globe size={21} />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700">Bandwidth used</p>
              <h1 className="text-xl font-black text-blue-600">
                {formatBytes(Number(data.cloudinary.bandwidth?.usage ?? 0))}
              </h1>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
              <DatabaseZap size={21} />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700">Storage used</p>
              <h1 className="text-xl font-black text-blue-600">
                 {formatBytes(Number(data.cloudinary.storage ?? 0))}
              </h1>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
              <Tags size={21} />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700">Topics created today</p>
              <h1 className="text-xl font-black text-blue-600">{data.topics.today}</h1>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 text-gray-700 p-4 rounded-2xl">
              <Tags size={21} />
            </div>
            <div className="flex flex-col">
              <p className="text-base text-gray-700">Total topics</p>
              <h1 className="text-xl font-black text-blue-600">{data.topics.total}</h1>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
