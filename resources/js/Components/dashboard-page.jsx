"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"
import { ArrowDown, ArrowUp, Box, DollarSign, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const revenueData = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 4800 },
  { name: "May", total: 6000 },
  { name: "Jun", total: 5500 },
]

const ordersData = [
  { name: "Mon", total: 45 },
  { name: "Tue", total: 42 },
  { name: "Wed", total: 50 },
  { name: "Thu", total: 48 },
  { name: "Fri", total: 55 },
  { name: "Sat", total: 40 },
  { name: "Sun", total: 35 },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    product: "Smart Watch",
    total: 299.99,
    status: "Pending",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    product: "Wireless Headphones",
    total: 149.5,
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    product: "Laptop Stand",
    total: 49.99,
    status: "Shipped",
  },
]

export function DashboardPage() {
  return (
    (<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}>
                  <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="total"
                    style={{ stroke: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <Bar
                    dataKey="total"
                    style={{
                      fill: "hsl(var(--primary))",
                      opacity: 0.9,
                    }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            <div className="mt-4 flex items-center space-x-2">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">Trending up</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stock</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
            <div className="mt-4 flex items-center space-x-2">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500">Low stock alert</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <Bar
                  dataKey="total"
                  style={{
                    fill: "hsl(var(--primary))",
                    opacity: 0.9,
                  }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}

