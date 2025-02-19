import { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import orderServive from "@/lib/Services/orders";
import payment from "@/lib/Services/paypendingpayment";

export function UserOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderServive.getUserOrders();
        console.log(response);

        // Parse the products field from JSON string to object
        const parsedOrders = response.orders.map(order => ({
          ...order,
          products: JSON.parse(order.products)
        }));

        setOrders(parsedOrders || []);
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
    order.products.some(product => product.product_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handlePayPending = (order) => {
    setSelectedOrder(order);
    setPaymentAmount("");
    setIsDialogOpen(true);
  };

  const handlePaymentAmountChange = (e) => {
    const amount = e.target.value;
    const numericAmount = Number(amount);

    if (numericAmount >= 0 && numericAmount <= selectedOrder.pending_payment) {
      setPaymentAmount(numericAmount);
    } else {
      toast.error("Amount should not exceed the pending payment.");
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedOrder || !paymentAmount || paymentAmount <= 0) {
      toast.error("Please enter a valid payment amount.");
      return;
    }

    try {
      // const response = await axios.post(`/pay-pending-payment`, {
      //   order_id: selectedOrder.id,
      //   payment_amount: paymentAmount,
      // });

      await payment.PendingPayment(selectedOrder.id, paymentAmount)

      toast.success("Payment successful!");

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === selectedOrder.id ? { ...o, pending_payment: String(Number(o.pending_payment) - Number(paymentAmount)) } : o
        )
      );

      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Payment failed. Please try again.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await orderServive.cancelOrder(orderId)
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === orderId ? { ...o, status: "canceled" } : o
        )
      );
      toast.success("Order has been canceled.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cancel the order.");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
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

      {/* Table layout for larger screens */}
      <div className="mt-4 border rounded-lg hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pending Amount</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-b">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.products.length} Products</TableCell>
                  <TableCell>{order.products.reduce((acc, product) => acc + product.quantity, 0)}</TableCell>
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
                    <div className="flex items-center gap-1">
                      <IndianRupee size={15} />
                      {order.paid_payment}
                    </div>
                  </TableCell>
                  <TableCell>
                    {Number(order.pending_payment) > 0 ? (
                      <span className="text-red-500 font-semibold">Pending</span>
                    ) : (
                      <span className="text-green-500 font-semibold">Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center items-center">
                      {/* Pay Pending Button */}
                      <Button
                        className={`
        text-white px-3 py-1
        ${order.status === "canceled" && "bg-orange-400"}
        ${order.status === "pending" && "bg-red-500"}
        ${order.status === "paid" && "bg-green-500"}
      `}
                        onClick={() => handlePayPending(order)}
                        disabled={Number(order.pending_payment) <= 0 || order.status === "canceled"}
                        style={{ flex: 1 }} // Make it stretch equally with other buttons
                      >
                        {order.status === "canceled" && "canceled"}
                        {order.status === "pending" && "pay pending"}
                        {order.status === "paid" && "paid"}
                      </Button>

                      {/* View Details Button */}
                      <Button
                        className="bg-gray-600 text-white px-3 py-1"
                        onClick={() => handleViewDetails(order)}
                        style={{ flex: 1 }} // Make it stretch equally with other buttons
                      >
                        <Eye size={16} />
                      </Button>

                      {/* Cancel Button (Only show if not canceled) */}
                      {order.status !== "canceled" && order.status !== "paid" && (
                        <Button
                          className="bg-yellow-600 text-white px-3 py-1"
                          onClick={() => handleCancelOrder(order.id)}
                          style={{ flex: 1 }} // Make it stretch equally with other buttons
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
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

      {/* Card layout for smaller screens */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Order ID: {order.id}</h3>
              <p><strong>Products:</strong> {order.products.length} Products</p>
              <p><strong>Quantity:</strong> {order.products.reduce((acc, product) => acc + product.quantity, 0)}</p>
              <p><strong>Total:</strong> {order.total_amount}</p>
              <p><strong>Pending Payment:</strong> {order.pending_payment}</p>
              <p><strong>Address:</strong> {order.user_address}</p>
              <div className="mt-2 flex gap-2">
                <Button
                  className={`${Number(order.pending_payment) > 0 && order.status !== "canceled" ? "bg-red-600" : "bg-orange-600"} text-white px-3 py-1`}
                  onClick={() => handlePayPending(order)}
                  disabled={Number(order.pending_payment) <= 0 || order.status === "canceled"}
                >
                  {Number(order.pending_payment) > 0 && order.status !== "canceled" ? "Pay Pending" : "canceled"}
                </Button>
                <Button
                  className="bg-gray-600 text-white px-3 py-1"
                  onClick={() => handleViewDetails(order)}
                >
                  <Eye size={16} />
                </Button>
                {order.status !== "canceled" && (
                  <Button
                    className="bg-yellow-600 text-white px-3 py-1"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No orders found.</div>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay Pending Payment</DialogTitle>
          </DialogHeader>
          <div>
            <label className="block text-sm">Enter Amount</label>
            <input
              type="number"
              value={paymentAmount}
              onChange={handlePaymentAmountChange}
              className="border p-2 mt-2 rounded-md w-full"
            />
          </div>
          <DialogFooter>
            <Button onClick={handlePaymentSubmit} disabled={Number(paymentAmount) <= 0}>Pay Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div><strong>Order ID:</strong> {selectedOrder.id}</div>
              <div><strong>Created At:</strong> {formatDate(selectedOrder.created_at)}</div>
              <div><strong>Phone</strong> {(selectedOrder.user_phone)}</div>
              <div><strong>Delivered At:</strong> {selectedOrder.delivered_date ? selectedOrder.delivered_date : "Not Delivered"}</div>
              <div><strong>Address:</strong> {selectedOrder.user_address}, {selectedOrder.user_city}, {selectedOrder.user_zip}</div>
              <div><strong>Total Amount:</strong> <IndianRupee size={15} /> {selectedOrder.total_amount}</div>
              <div><strong>Payment Status:</strong> {selectedOrder.pending_payment === "0" ? "Paid" : "Pending"}</div>
              <div>
                <strong>Products:</strong>
                <ul className="list-disc pl-5 ">
                  {selectedOrder.products.map((product, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {product.product_name} - {product.quantity} x <IndianRupee size={15} /> {product.product_price} = <IndianRupee size={15} /> {product.total_price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}