import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { fetchProducts } from "@/lib/Api";
import { IndianRupee } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function OrderPage({ id }) {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
  
  const [product, setProduct] = useState({
    id: 1,
    name: "Smartphone",
    image: "https://via.placeholder.com/100",
    quantity: 1,
    amount: 100,
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // State to store error message
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(id);
        setProducts(productsData[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [id]);

  const handleProductChange = (key, value) => {
    if (key === "quantity") {
      // Check if the entered quantity exceeds the stock quantity
      if (value > products.stock_quantity) {
        setError("Quantity exceeds available stock.");
      } else {
        setError(""); // Clear the error message if valid quantity
        setProduct((prev) => ({ ...prev, [key]: value }));
        setValue("quantity", value); // Update the React Hook Form field
      }
    } else {
      setProduct((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Calculate total amount based on product price and user-input quantity
  const totalAmount = parseFloat(products.price) * product.quantity || 0;
  const paidAmount = parseFloat(watch('paid_amount')) || 0;
  const remainingAmount = Math.max(totalAmount - paidAmount, 0);

  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        product_name: products.productName,
        product_id: products.id,
        quantity: product.quantity,
        total_amount: totalAmount,
        remaining_amount: remainingAmount,
        product_price: products.price
      };
  
      const response = await axios.post("/OrderStore", orderData);
      console.log("Order placed successfully", response.data);
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        paid_amount: "",
        quantity: 1, // Ensure quantity resets
      });
      toast.success("Order placed successfully");
      setProduct({ id: 1, name: "", image: "", quantity: 1, amount: 0 }); // Reset product state
      setError(""); // Clear error state
  
    } catch (err) {
      console.error("Error placing order", err);
    }
  };
  

  let filledFields = Object.values(watch()).filter((v) => v !== "").length;
  let filledProduct = product.amount !== "" ? 1 : 0;
  let progress = Math.min((filledFields + filledProduct) / (Object.keys(watch()).length + 1) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Complete Your Order</h1>
      <ToastContainer position="top-right" autoClose={3000} />
      <Progress value={progress} className="mb-6" />

      {/* Product Details */}
      <Card className="mb-4">
        <CardHeader>Order Summary</CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <h3 className="font-semibold">{products.productName}</h3>
              <Input
                type="number"
                value={product.quantity}
                {...register('quantity', { 
                  valueAsNumber: true, 
                  min: 1,
                  required: "Quantity is required"
                })}
                onChange={(e) => handleProductChange("quantity", parseInt(e.target.value) || 1)}
                className="w-20 text-center"
              />
              {/* Display error message if quantity exceeds stock */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Price:</span>
              <span className="text-xl font-bold">{products.price}</span>
            </div>
          </div>
        </CardContent>
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
                  return value >= halfOfTotal || `Paid amount must be at least half of the total amount. (${halfOfTotal.toFixed(2)})`;
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
