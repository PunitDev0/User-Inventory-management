import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import orderServive from "@/lib/Services/orders";

// Helper function to generate dates for last 7 days
const getLast7Days = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Function to organize orders by date
const getOrdersByDate = (orders, dates) => {
  const ordersByDate = {};
  dates.forEach(date => {
    ordersByDate[date] = 0;
  });

  orders.forEach(order => {
    const orderDate = new Date(order.created_at).toISOString().split('T')[0];
    if (orderDate in ordersByDate) {
      ordersByDate[orderDate]++;
    }
  });

  return dates.map(date => ({
    date,
    orders: ordersByDate[date]
  }));
};

const getLast7DaysOrders = (orders) => {
  const today = new Date();
  return orders.filter(order => {
    const orderDate = new Date(order.created_at);
    return (today - orderDate) / (1000 * 3600 * 24) <= 7;
  });
};

const getTop5Users = (orders) => {
  const userOrderCount = orders.reduce((acc, order) => {
    const userId = order.user_id;
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(userOrderCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId, count]) => ({
      name: `User ${userId}`,
      value: count,
    }));
};

const Dashboard = () => {
  const [companyOrders, setCompanyOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [companyResponse, userResponse] = await Promise.all([
          orderServive.getAllOrders(),
          orderServive.getUserOrders()
        ]);
        console.log(userResponse);
        
        
        setCompanyOrders(companyResponse.orders || []);
        setUserOrders(userResponse.orders || []);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const last7Days = getLast7Days();
  const last7DaysOrders = getLast7DaysOrders(userOrders);
  const top5Users = getTop5Users(last7DaysOrders);

  const successfulPayments = userOrders.filter(order => order.status === 'paid');
  const pendingPayments = userOrders.filter(order => order.status === 'pending');
console.log(userOrders);

  const companyChartData = getOrdersByDate(companyOrders, last7Days);
  const userChartData = getOrdersByDate(userOrders, last7Days);
  const successfulPaymentsData = getOrdersByDate(successfulPayments, last7Days);
  const pendingPaymentsData = getOrdersByDate(pendingPayments, last7Days);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* All Orders Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              All Orders
            </CardTitle>
            <CardDescription>Total orders placed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{companyOrders.length}</p>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={companyChartData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070f3" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#0070f3"
                  strokeWidth={2}
                  fill="url(#colorOrders)"
                  dot={true}
                />
                <Tooltip labelFormatter={(value) => `Date: ${value}`} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* My Orders Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              My Orders
            </CardTitle>
            <CardDescription>Your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userOrders.length}</p>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={userChartData}>
                <defs>
                  <linearGradient id="colorMyOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b894" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#00b894"
                  strokeWidth={2}
                  fill="url(#colorMyOrders)"
                  dot={true}
                />
                <Tooltip labelFormatter={(value) => `Date: ${value}`} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Successful Payments Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Successful Payments
            </CardTitle>
            <CardDescription>Payments completed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{successfulPayments.length}</p>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={successfulPaymentsData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#2ecc71"
                  strokeWidth={2}
                  fill="url(#colorSuccess)"
                  dot={true}
                />
                <Tooltip labelFormatter={(value) => `Date: ${value}`} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Payments Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-yellow-500" />
              Pending Payments
            </CardTitle>
            <CardDescription>Payments pending</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingPayments.length}</p>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={pendingPaymentsData}>
                <defs>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#f39c12"
                  strokeWidth={2}
                  fill="url(#colorPending)"
                  dot={true}
                />
                <Tooltip labelFormatter={(value) => `Date: ${value}`} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart for Order Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              Order Distribution (Top 5 Users)
            </CardTitle>
            <CardDescription>Orders from the top 5 users in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={top5Users}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="50%"
                  outerRadius="70%"
                  fill="#8884d8"
                >
                  {top5Users.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default Dashboard;