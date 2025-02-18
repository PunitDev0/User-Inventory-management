import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout({ cartItems }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
  const [products, setProducts] = useState(cartItems);
  const [error, setError] = useState(""); // State to store error message

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    if (key === "quantity") {
      // Check if the entered quantity exceeds the stock quantity
      if (value > updatedProducts[index].stock_quantity) {
        setError("Quantity exceeds available stock.");
      } else {
        setError(""); // Clear the error message if valid quantity
        updatedProducts[index][key] = value;
        setProducts(updatedProducts);
        setValue(`products[${index}].quantity`, value); // Update the React Hook Form field
      }
    } else {
      updatedProducts[index][key] = value;
      setProducts(updatedProducts);
    }
  };

  // Calculate total amount based on product price and user-input quantity
  const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.price) * product.quantity, 0);
  const paidAmount = parseFloat(watch('paid_amount')) || 0;
  const remainingAmount = Math.max(totalAmount - paidAmount, 0);

  const onSubmit = async (data) => {
    try {
      // Prepare order data
      const orderData = {
        ...data,
        products: products.map(product => ({
          product_name: product.productName,
          product_id: product.product_id,
          quantity: product.quantity,
          product_price: product.price
        })),
        total_amount: totalAmount,
        paid_amount: paidAmount,
        remaining_amount: remainingAmount,  // Add remaining amount here
      };

      console.log(orderData);  // Log order data for debugging

      // Send order data to backend
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/OrderStore`, orderData);
      console.log("Order placed successfully", response.data);

      // Reset the form and product state after a successful order
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        paid_amount: "",
      });
      setProducts(cartItems);  // Reset product state
      setError("");  // Clear any error messages

      toast.success("Order placed successfully");
    } catch (err) {
      console.error("Error placing order", err);
      toast.error("Error placing the order. Please try again.");
    }
  };

  let filledFields = Object.values(watch()).filter((v) => v !== "").length;
  let filledProduct = products.some(product => product.quantity > 0) ? 1 : 0;
  let progress = Math.min((filledFields + filledProduct) / (Object.keys(watch()).length + 1) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Complete Your Order</h1>
      <ToastContainer position="top-right" autoClose={3000} />
      <Progress value={progress} className="mb-6" />

      {/* Product Details */}
      {products.map((product, index) => (
        <Card key={product.cart_id} className="mb-4">
          <CardHeader>Order Summary</CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <h3 className="font-semibold">{product.productName}</h3>
                <Input
                  type="number"
                  value={product.quantity}
                  {...register(`products[${index}].quantity`, { 
                    valueAsNumber: true, 
                    min: 1,
                    required: "Quantity is required"
                  })}
                  onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                />
                {/* Display error message if quantity exceeds stock */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {errors.products?.[index]?.quantity && <p className="text-red-500 text-sm">{errors.products[index].quantity.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Price:</span>
                <span className="text-xl font-bold">{product.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="mb-4">
        <CardFooter className="flex flex-col space-y-2 font-bold">
          <div className="flex justify-between w-full">
            <span>Total Price:</span>
            <span className="flex items-center"><IndianRupee size={15}/>{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full">
            <span>Paid Amount:</span>
            <Input
              type="number"
              min="0"
              max={totalAmount} // Ensure paid amount does not exceed total amount
              placeholder="Enter Paid Amount"
              {...register('paid_amount', { 
                valueAsNumber: true, 
                required: "Paid amount is required",
                validate: (value) => {
                  const halfOfTotal = totalAmount / 2;
                  if (value >= halfOfTotal && value <= totalAmount) {
                    return true;
                  }
                  return `Paid amount must be at least half of the total amount (${halfOfTotal.toFixed(2)}) and cannot exceed the total amount (${totalAmount.toFixed(2)}).`;
                }
              })}
              className="w-24 text-center"
            />
            {errors.paid_amount && <p className="text-red-500 text-sm">{errors.paid_amount.message}</p>}
          </div>
          <div className="flex justify-between w-full">
            <span>Remaining Amount:</span>
            <span className="flex items-center"><IndianRupee size={15}/>{remainingAmount.toFixed(2)}</span>
          </div>
        </CardFooter>
      </Card>

      {/* User Information */}
      <Card className="mb-4">
        <CardHeader>Personal Details</CardHeader>
        <CardContent className="space-y-3">
          <Input {...register('name', { required: "Name is required" })} placeholder="Full Name" />
          <Input {...register('email', { required: "Email is required" })} placeholder="Email Address" />
          <Input {...register('phone', { required: "Phone number is required" })} placeholder="Phone Number" />
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="mb-4">
        <CardHeader>Shipping Address</CardHeader>   
        <CardContent className="space-y-3">
          <Input {...register('address', { required: "Address is required" })} placeholder="Street Address" />
          <Input {...register('city', { required: "City is required" })} placeholder="City" />
          <Input {...register('zip', { required: "ZIP Code is required" })} placeholder="ZIP Code" />
        </CardContent>
      </Card>

      <Button 
        className="w-full mt-4" 
        disabled={progress < 100 || error}
        onClick={handleSubmit(onSubmit)}
      >
        Place Order
      </Button>
    </div>
  );
}