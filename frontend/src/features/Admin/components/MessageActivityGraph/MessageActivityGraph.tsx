import { Activity, Loader2 } from "lucide-react";
import { useAdminAnalytics } from "../../hooks/useAdminAnalytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ActivityGraph = () => {
  const { data, loading, error } = useAdminAnalytics();

  if (loading) return <Loader2 size={20} className="animate-spin" />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const messageTrend =
    data.messages.perDay?.map((d) => ({
      date: d._id,
      count: d.count,
    })) || [];

  return (
    <div className="w-full">
      <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4 shadow">
        <div className="flex items-center gap-1 py-1 ml-1 text-gray-700">
          <Activity size={20} />
          <h1 className="text-lg sm:text-xl rounded-xl">Message Activity</h1>
        </div>

          <div className="w-full bg-gray-100 rounded-xl p-2 shadow mt-2">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={messageTrend}
                margin={{ top: 10, right: 10, left: -38, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.slice(5)}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4f46e5" // Tailwind indigo-600
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default ActivityGraph;
