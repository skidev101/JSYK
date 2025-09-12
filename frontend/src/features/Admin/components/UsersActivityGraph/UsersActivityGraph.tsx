import { AreaChartIcon, Loader2 } from "lucide-react";
import { useAdminAnalytics } from "../../hooks/useAdminAnalytics";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const UsersActivityGraph = () => {
  const { data, loading, error } = useAdminAnalytics();

  if (loading) return <Loader2 size={20} className="animate-spin" />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const messageTrend =
    data.users.perDay?.map((d) => ({
      date: d._id,
      count: d.count,
    })) || [];

  return (
    <div className="w-full">
      <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4 shadow">
        <div className="flex items-center gap-1 py-1 ml-1 text-gray-700">
          <AreaChartIcon size={20} />
          <h1 className="text-lg sm:text-xl rounded-xl">
            Active users per day
          </h1>
        </div>

        <div className="w-full bg-gray-100 rounded-xl p-2 shadow mt-2">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={messageTrend}
              margin={{ top: 10, right: 10, left: -40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4f46e5"
                fill="#c7d2fe"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UsersActivityGraph;
