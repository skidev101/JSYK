import { Activity } from "lucide-react";
import { useAdminAnalytics } from "../../hooks/useAdminAnalytics";
import Card from "@/shared/components/Card";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  // 👇 Format per-day data into something recharts can consume
  const messageTrend =
    data.messages.perDay?.map((d) => ({
      date: d._id, // your backend probably returns "YYYY-MM-DD"
      count: d.count,
    })) || [];

  return (
    <div className="w-full">
      <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4 shadow">
        <div className="flex items-center gap-1 py-1 ml-1 text-gray-700">
          <Activity size={20} />
          <h1 className="text-lg sm:text-xl rounded-xl">Activity</h1>
        </div>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Message Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messageTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
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
        </Card>
      </div>
    </div>
  );
};

export default ActivityGraph;
