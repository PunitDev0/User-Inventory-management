import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import orderServive from "@/lib/Services/orders";

// Helper functions
const getLastNDays = (n) => {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const getOrdersByDate = (orders, dates) => {
  const ordersByDate = {};
  dates.forEach((date) => {
    ordersByDate[date] = 0;
  });

  orders.forEach((order) => {
    const orderDate = new Date(order.created_at).toISOString().split("T")[0];
    if (ordersByDate[orderDate] !== undefined) {
      ordersByDate[orderDate]++;
    }
  });

  return dates.map((date) => ({
    date,
    orders: ordersByDate[date] || 0,
  }));
};

const getOrdersInRange = (orders, days) => {
  const today = new Date();
  return orders.filter((order) => {
    const orderDate = new Date(order.created_at);
    return days === "All"
      ? true
      : (today - orderDate) / (1000 * 3600 * 24) <= days;
  });
};

const getTop5Users = (orders) => {
  const userOrderCount = orders.reduce((acc, order) => {
    const userId = order.user_id || "unknown"; // Fallback for missing user_id
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(userOrderCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId, count]) => ({
      name: userId === "unknown" ? "Unknown User" : `User ${userId}`,
      value: count,
    }));
};

const getTotalRevenue = (orders) => {
  return orders.reduce(
    (total, order) => total + parseFloat(order.paid_payment || 0),
    0
  );
};

const getAggregatedData = (orders) => {
  if (orders.length === 0) return [];
  const dataByMonth = {};
  orders.forEach((order) => {
    const date = new Date(order.created_at);
    const month = date.toLocaleString("default", { month: "short", year: "numeric" });
    dataByMonth[month] = (dataByMonth[month] || 0) + 1;
  });
  return Object.keys(dataByMonth).map((month) => ({
    date: month,
    orders: dataByMonth[month],
  }));
};

const COLORS = ["#6b7280", "#f97316", "#22c55e", "#3b82f6", "#a855f7"];

const Dashboard = () => {
  const [companyOrders, setCompanyOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("All"); // Default to All data

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [companyResponse, userResponse] = await Promise.all([
          orderServive.getAllOrders(),
          orderServive.getUserOrders(),
        ]);
        setCompanyOrders(companyResponse.orders || []);
        setUserOrders(userResponse.orders || []);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400 animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  const days = timeRange === "All" ? "All" : parseInt(timeRange);
  const dates = days === "All" ? [] : getLastNDays(days);
  const filteredOrders = getOrdersInRange(userOrders, days);
  const top5Users = getTop5Users(filteredOrders);
  const totalRevenue = getTotalRevenue(filteredOrders);
  const successfulPayments = filteredOrders.filter(
    (order) => order.status === "paid"
  );
  const pendingPayments = filteredOrders.filter(
    (order) => order.status === "pending"
  );

  const companyChartData = days === "All" ? getAggregatedData(companyOrders) : getOrdersByDate(companyOrders, dates);
  const userChartData = days === "All" ? getAggregatedData(filteredOrders) : getOrdersByDate(filteredOrders, dates);
  const successfulPaymentsData = days === "All" ? getAggregatedData(successfulPayments) : getOrdersByDate(successfulPayments, dates);
  const pendingPaymentsData = days === "All" ? getAggregatedData(pendingPayments) : getOrdersByDate(pendingPayments, dates);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          Dashboard
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Time Range:</span>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] sm:w-[150px] rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="7" className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                Last 7 Days
              </SelectItem>
              <SelectItem value="30" className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                Last 30 Days
              </SelectItem>
              <SelectItem value="All" className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                All Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <Package className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
              Total Orders
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">All company orders</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {companyOrders.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-teal-50 dark:bg-teal-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 dark:text-teal-400" />
              My Orders
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">Your personal orders</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400">
              {userOrders.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-green-50 dark:bg-green-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
              Paid Orders
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">Successful payments</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
              {successfulPayments.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600 dark:text-yellow-400" />
              Total Revenue
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">Revenue from all orders</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-3xl sm:text-4xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center">
              <IndianRupee size={20} sm:size={24} className="mr-1" /> {totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Company Orders Chart */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
              Company Orders Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
              {timeRange === "All" ? "All time" : `Last ${timeRange} days`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" minHeight={300}>
              {companyChartData.length > 0 ? (
                <AreaChart data={companyChartData}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0070f3" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeRange === "All" ? value : value.split("-").slice(1).join("-")
                    }
                  />
                  <YAxis stroke="#666" tick={{ fill: "#666", fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#0070f3"
                    strokeWidth={2}
                    fill="url(#colorOrders)"
                    dot={{ r: 4, fill: "#0070f3" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #e0e0e0",
                    }}
                    labelStyle={{ color: "#333" }}
                    itemStyle={{ color: "#0070f3" }}
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value) => Math.round(value)}
                  />
                </AreaChart>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                  No data available for this range
                </div>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* My Orders Chart */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-teal-50 dark:bg-teal-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 dark:text-teal-400" />
              My Orders Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
              {timeRange === "All" ? "All time" : `Last ${timeRange} days`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" minHeight={300}>
              {userChartData.length > 0 ? (
                <AreaChart data={userChartData}>
                  <defs>
                    <linearGradient id="colorMyOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00b894" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeRange === "All" ? value : value.split("-").slice(1).join("-")
                    }
                  />
                  <YAxis stroke="#666" tick={{ fill: "#666", fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#00b894"
                    strokeWidth={2}
                    fill="url(#colorMyOrders)"
                    dot={{ r: 4, fill: "#00b894" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #e0e0e0",
                    }}
                    labelStyle={{ color: "#333" }}
                    itemStyle={{ color: "#00b894" }}
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value) => Math.round(value)}
                  />
                </AreaChart>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                  No data available for this range
                </div>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Successful Payments Chart */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-green-50 dark:bg-green-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
              Successful Payments Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
              {timeRange === "All" ? "All time" : `Last ${timeRange} days`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" minHeight={300}>
              {successfulPaymentsData.length > 0 ? (
                <AreaChart data={successfulPaymentsData}>
                  <defs>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeRange === "All" ? value : value.split("-").slice(1).join("-")
                    }
                  />
                  <YAxis stroke="#666" tick={{ fill: "#666", fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#2ecc71"
                    strokeWidth={2}
                    fill="url(#colorSuccess)"
                    dot={{ r: 4, fill: "#2ecc71" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #e0e0e0",
                    }}
                    labelStyle={{ color: "#333" }}
                    itemStyle={{ color: "#2ecc71" }}
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value) => Math.round(value)}
                  />
                </AreaChart>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                  No data available for this range
                </div>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Payments Chart */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-600 dark:text-yellow-400" />
              Pending Payments Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
              {timeRange === "All" ? "All time" : `Last ${timeRange} days`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" minHeight={300}>
              {pendingPaymentsData.length > 0 ? (
                <AreaChart data={pendingPaymentsData}>
                  <defs>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      timeRange === "All" ? value : value.split("-").slice(1).join("-")
                    }
                  />
                  <YAxis stroke="#666" tick={{ fill: "#666", fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#f39c12"
                    strokeWidth={2}
                    fill="url(#colorPending)"
                    dot={{ r: 4, fill: "#f39c12" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #e0e0e0",
                    }}
                    labelStyle={{ color: "#333" }}
                    itemStyle={{ color: "#f39c12" }}
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value) => Math.round(value)}
                  />
                </AreaChart>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                  No data available for this range
                </div>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Distribution Pie Chart */}
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 col-span-1 lg:col-span-2">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-t-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-lg sm:text-xl font-semibold">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 dark:text-indigo-400" />
                Order Distribution (Top 5 Users)
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {timeRange === "All" ? "All time" : `Last ${timeRange} days`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Orders:
              </span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {filteredOrders.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" minHeight={300} sm:minHeight={400}>
              {top5Users.length > 0 ? (
                <PieChart>
                  <Pie
                    data={top5Users}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={5}
                    animationDuration={800}
                    animationBegin={100}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {top5Users.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px solid #e0e0e0",
                    }}
                    labelStyle={{ color: "#333" }}
                    formatter={(value, name) => [`${value} orders`, name]}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      paddingLeft: "20px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                    formatter={(value, entry) => (
                      <span
                        style={{
                          color:
                            COLORS[
                              entry.payload.payload.fill
                                ? COLORS.indexOf(entry.payload.payload.fill)
                                : 0
                            ],
                        }}
                      >
                        {value}: {entry.payload.value}
                      </span>
                    )}
                  />
                </PieChart>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                  No user data available
                </div>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;