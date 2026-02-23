import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetAllPurchasedCoursesQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-black/40 dark:text-white/30 text-sm">Loading...</p>
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500 text-sm">Failed to get purchased courses.</p>
    );

  const { purchasedCourse } = data || { purchasedCourse: [] };
  const courseData = purchasedCourse.map((c) => ({
    name: c.courseId.courseTitle,
    price: c.courseId.coursePrice,
  }));
  const totalRevenue = purchasedCourse.reduce(
    (acc, el) => acc + (el.amount || 0),
    0,
  );
  const totalSales = purchasedCourse.length;

  const StatCard = ({ label, value }) => (
    <div className="glass-card p-6 flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-black/35 dark:text-white/30">
        {label}
      </p>
      <p className="text-3xl font-black text-black dark:text-white">{value}</p>
    </div>
  );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Sales" value={totalSales} />
      <StatCard
        label="Total Revenue"
        value={`₹${totalRevenue.toLocaleString()}`}
      />

      {/* Full-width chart card */}
      <div className="glass-card p-6 col-span-1 sm:col-span-2 lg:col-span-4">
        <p className="text-sm font-semibold text-black/60 dark:text-white/50 mb-4 uppercase tracking-wider">
          Course Prices
        </p>
        <ResponsiveContainer width="99%" height={300}>
          <LineChart data={courseData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(128,128,128,0.15)"
            />
            <XAxis
              dataKey="name"
              stroke="rgba(128,128,128,0.5)"
              angle={-25}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="rgba(128,128,128,0.5)" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--card-foreground)",
                fontSize: "12px",
              }}
              formatter={(value) => [`₹${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="currentColor"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--foreground)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
