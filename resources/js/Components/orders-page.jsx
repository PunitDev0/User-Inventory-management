import { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";

export function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/OrderStore`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handlePayPending = (order) => {
    setSelectedOrder(order);
    setPaymentAmount(order.pending_payment);
    setIsDialogOpen(true);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedOrder) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/pay-pending-payment`, {
        order_id: selectedOrder.id,
        payment_amount: paymentAmount,
      });
      alert(response.data.message);
      toast.success(response.data.message);
      // Refresh orders after payment
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === selectedOrder.id ? { ...o, pending_payment: "0" } : o
        )
      );

      setIsDialogOpen(false);
    } catch (error) {
      alert(error.response?.data?.error || "Payment failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-4 border rounded-lg hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pending Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-b">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    {order.user_address}, {order.user_city}, {order.user_zip}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee size={15} />
                      {order.total_amount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee size={15} />
                      {order.pending_payment}
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.pending_payment !== "0" ? (
                      <span className="text-red-500 font-semibold">Pending</span>
                    ) : (
                      <span className="text-green-500 font-semibold">Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      className={`${
                        order.pending_payment !== "0" ? "bg-red-600" : "bg-green-600"
                      } text-white px-3 py-1`}
                      onClick={() => handlePayPending(order)}
                      disabled={order.pending_payment == "0"}
                    >
                      {order.pending_payment !== "0" ? "Pay Pending" : "Paid"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex flex-col gap-4 lg:hidden">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-md bg-white">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <span
                  className={`px-2 py-1 text-sm font-medium rounded-lg ${
                    order.pending_payment !== "0" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.pending_payment !== "0" ? "Pending" : "Paid"}
                </span>
              </div>
              <p className="mt-2 text-gray-600">
                <b>Product:</b> {order.product_name}
              </p>
              <p className="mt-1 text-gray-600">
                <b>Quantity:</b> {order.quantity}
              </p>
              <p className="mt-1 text-gray-600">
                <b>Address:</b> {order.user_address}, {order.user_city}, {order.user_zip}
              </p>
              <p className="mt-1 text-gray-600 flex items-center">
                <IndianRupee size={15} />
                <b>Total:</b> {order.total_amount}
              </p>
              <p className="mt-1 text-gray-600 flex items-center">
                <IndianRupee size={15} />
                <b>Pending:</b> {order.pending_payment}
              </p>
              <Button
                className={`w-full mt-3 ${
                  order.pending_payment !== "0" ? "bg-red-600" : "bg-green-600"
                } text-white py-2`}
                onClick={() => handlePayPending(order)}
              >
                {order.pending_payment !== "0" ? "Pay Pending" : "Paid"}
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No orders found.</div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay Pending Amount</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Amount to Pay</label>
            <Input className="mt-2" type="number" value={paymentAmount} disabled />
          </div>
          <DialogFooter>
            <Button className="bg-red-600 text-white" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="ml-2 bg-green-600 text-white" onClick={handlePaymentSubmit}>
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
