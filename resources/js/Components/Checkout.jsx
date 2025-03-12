import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IndianRupee, ShoppingCart } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { Layout } from "./Layout"; // Assuming Layout is your updated NewLayout component
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ordersService from "@/lib/Services/orders";
import { Inertia } from "@inertiajs/inertia";

export default function Checkout({ cartItems }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [products, setProducts] = useState(cartItems || []);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUserData(userInfo);
    }
    if (products.length > 0) {
      checkAvailability(deliveryDate);
    }
  }, [products]);

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    if (key === "quantity") {
      if (value > updatedProducts[index].stock_quantity) {
        setError("Quantity exceeds available stock.");
      } else {
        setError("");
        updatedProducts[index][key] = value;
        setProducts(updatedProducts);
        setValue(`products[${index}].quantity`, value);
        checkAvailability(deliveryDate);
      }
    } else {
      updatedProducts[index][key] = value;
      setProducts(updatedProducts);
    }
  };

  const checkAvailability = async (date) => {
    if (products.length === 0) return;

    try {
      const formattedDate = date
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
        .replace(",", "");

      const availabilityData = {
        products: products.map((product) => ({
          product_id: product.product.id,
          quantity: product.quantity,
        })),
        delivered_date: formattedDate,
      };

      const API_URL =
        import.meta.env.VITE_ENVIRONMENT === "production"
          ? "https://event.nikatby.in/user/public/api/check-availability"
          : "api/check-availability";

      const response = await axios.post(API_URL, availabilityData);
      setAvailabilityStatus(response.data);
    } catch (err) {
      console.error("Error checking availability", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not check availability. Please try again.",
      });
    }
  };

  const handleDateChange = (date) => {
    setDeliveryDate(date);
    checkAvailability(date);
  };

  const bookingPrice = products.reduce(
    (sum, product) => sum + parseFloat(product.product.price) * product.quantity,
    0
  );

  const bookingAmount = parseFloat(watch("booking_amount")) || 0;
  const paidAmount = parseFloat(watch("paid_amount")) || 0;
  const remainingAmount = Math.max(bookingAmount - paidAmount, 0);

  const onSubmit = async (data) => {
    if (Object.values(availabilityStatus).some((status) => !status.available)) {
      Swal.fire({
        icon: "warning",
        title: "Stock Unavailable",
        text: "Some products are not available on the selected delivery date.",
      });
      return;
    }

    if (bookingAmount <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Booking Amount",
        text: "Booking amount must be greater than 0.",
      });
      return;
    }

    if (paidAmount > bookingAmount) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Paid Amount",
        text: "Paid amount cannot exceed the booking amount.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedDeliveryDate = deliveryDate
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
        .replace(",", "");

      const orderData = {
        ...data,
        delivered_date: formattedDeliveryDate,
        products: products.map((product) => ({
          product_name: product.product.productName,
          product_id: product.product.id,
          quantity: product.quantity,
          product_price: product.product.price,
          total_price: parseFloat(product.product.price) * product.quantity,
          From: product.product.companyName || product.product.shop_name,
        })),
        total_amount: bookingAmount,
        paid_amount: paidAmount,
        pending_payment: remainingAmount,
      };

      console.log("Order Data:", orderData);

      const response = await ordersService.placeOrder(orderData, "checkout");
      console.log("Order placed successfully", response.data);

      await Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        text: "Your order has been confirmed. Redirecting to products page...",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });

      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        booking_amount: "",
        paid_amount: "",
      });
      setProducts([]);
      setError("");
      setAvailabilityStatus({});
      const endpoint =
      import.meta.env.VITE_ENVIRONMENT === "production"
        ? "https://event.nikatby.in/user/public/AllProduct"
        : "/AllProduct";
      Inertia.visit(endpoint);
    } catch (err) {
      console.error("Error placing order", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error placing the order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filledFields = Object.values(watch()).filter((v) => v !== "").length;
  const filledProduct = products.some((product) => product.quantity > 0) ? 1 : 0;
  const progress = Math.min(
    (filledFields + filledProduct) / (Object.keys(watch()).length + 1) * 100,
    100
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 via-gray-100 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-tight mb-8">
          Complete Your Order
        </h1>
        <Progress value={progress} className="mb-8 h-3 rounded-full bg-indigo-200 dark:bg-gray-700 shadow-md" />

        {/* Product Details */}
        {products.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg py-6 animate-pulse">
            No items in cart. <a href="/AllProduct" className="text-indigo-600 dark:text-indigo-400 hover:underline">Add some products!</a>
          </div>
        ) : (
          products.map((product, index) => (
            <Card
              key={index}
              className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700"
            >
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Order Summary
              </CardHeader>
              <CardContent className="space-y-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100 tracking-tight">{product.product.productName}</h3>
                    <Input
                      type="number"
                      value={product.quantity}
                      {...register(`products[${index}].quantity`, {
                        valueAsNumber: true,
                        min: { value: 1, message: "Quantity must be at least 1" },
                        required: "Quantity is required",
                      })}
                      onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value) || 1)}
                      className="w-24 text-center mt-2 rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                    />
                    {error && <p className="text-red-500 dark:text-red-400 text-sm mt-1 animate-pulse">{error}</p>}
                    {errors.products?.[index]?.quantity && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.products[index].quantity.message}</p>
                    )}
                    {availabilityStatus[product.product.id] && (
                      <p
                        className={`text-sm mt-1 ${
                          availabilityStatus[product.product.id].available
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400 animate-pulse"
                        }`}
                      >
                        {availabilityStatus[product.product.id].message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Price:</span>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300 flex items-center">
                      <IndianRupee size={20} /> {parseFloat(product.product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {products.length > 0 && (
          <>
            {/* Booking and Payment Details */}
            <Card className="mb-6 shadow-lg border border-indigo-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Payment Details
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Booking Amount:</span>
                  <div className="flex flex-col w-full sm:w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter Amount"
                      {...register("booking_amount", {
                        valueAsNumber: true,
                        required: "Booking amount is required",
                        min: { value: 0.01, message: "Booking amount must be greater than 0" },
                      })}
                      className="text-center rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                    />
                    {errors.booking_amount && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.booking_amount.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Paid Amount:</span>
                  <div className="flex flex-col w-full sm:w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter Amount"
                      {...register("paid_amount", {
                        valueAsNumber: true,
                        required: false,
                        validate: (value) => {
                          if (value < 0) return "Paid amount cannot be negative";
                          if (value > bookingAmount) return "Paid amount cannot exceed booking amount";
                          return true;
                        },
                      })}
                      className="text-center rounded-lg shadow-md border-indigo-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                    />
                    {errors.paid_amount && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.paid_amount.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Remaining Amount:</span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-300 font-bold text-xl">
                    <IndianRupee size={20} /> {remainingAmount.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* User Information */}
            <Card className="mb-6 shadow-lg border border-indigo-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Client Details
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                  defaultValue={userData.name}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.name && <p className="text-red-500 dark:text-red-400 text-sm">{errors.name.message}</p>}
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email Address"
                  defaultValue={userData.email}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.email && <p className="text-red-500 dark:text-red-400 text-sm">{errors.email.message}</p>}
                <Input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                  placeholder="Phone Number"
                  defaultValue={userData.phone}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.phone && <p className="text-red-500 dark:text-red-400 text-sm">{errors.phone.message}</p>}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="mb-6 shadow-lg border border-indigo-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Shipping Address
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Street Address"
                  defaultValue={userData.address}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.address && <p className="text-red-500 dark:text-red-400 text-sm">{errors.address.message}</p>}
                <Input
                  {...register("city", { required: "City is required" })}
                  placeholder="City"
                  defaultValue={userData.city}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.city && <p className="text-red-500 dark:text-red-400 text-sm">{errors.city.message}</p>}
                <Input
                  {...register("zip", {
                    required: "ZIP Code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "ZIP Code must be 6 digits",
                    },
                  })}
                  placeholder="ZIP Code"
                  defaultValue={userData.zip}
                  className="border-indigo-300 dark:border-gray-600 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-indigo-50 dark:bg-gray-700"
                />
                {errors.zip && <p className="text-red-500 dark:text-red-400 text-sm">{errors.zip.message}</p>}
              </CardContent>
            </Card>

            {/* Delivered Date (Calendar) */}
            <Card className="mb-6 shadow-lg border border-indigo-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Delivery Date
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <Calendar
                  onChange={handleDateChange}
                  value={deliveryDate}
                  className="border-indigo-300 dark:border-gray-600 p-4 rounded-lg w-full max-w-md bg-white dark:bg-gray-800 shadow-lg transition-all duration-300"
                  minDate={new Date()}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Select a date for delivery.</p>
              </CardContent>
            </Card>

            {/* Data Preview */}
            <Card className="mb-6 shadow-lg border border-indigo-200 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-gray-100 font-semibold p-4">
                Order Preview
              </CardHeader>
              <CardContent className="p-6 space-y-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("name") || userData.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("email") || userData.email || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Phone:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("phone") || userData.phone || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("address") || userData.address || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">City:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("city") || userData.city || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">ZIP Code:</span>
                  <span className="text-gray-800 dark:text-gray-100">{watch("zip") || userData.zip || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Delivery Date:</span>
                  <span className="text-gray-800 dark:text-gray-100">{deliveryDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Booking Amount:</span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-300 font-bold">
                    <IndianRupee size={20} /> {bookingAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Paid Amount:</span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-300 font-bold">
                    <IndianRupee size={20} /> {paidAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Remaining Amount:</span>
                  <span className="flex items-center text-indigo-600 dark:text-indigo-300 font-bold">
                    <IndianRupee size={20} /> {remainingAmount.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full sm:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                disabled={
                  isSubmitting ||
                  products.length === 0 ||
                  Object.values(availabilityStatus).some((status) => !status.available)
                }
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}