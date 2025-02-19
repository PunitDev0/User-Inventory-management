import { useEffect, useState } from "react";
import { Eye, Filter, IndianRupee, ShoppingCart } from "lucide-react";
import cn from "classnames";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "@inertiajs/react";
import axios from 'axios';
import Dashboard from "./Dashboard";
import product from "@/lib/Services/product";
import { toast } from "react-toastify";

export function AllProdcuts() {
  const [filter, setFilter] = useState("All Categories");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // State for order modal
  const [cart, setCart] = useState([]); // State to track cart items

  useEffect(() => {
    const getProducts = async () => {
      try {
        // const productsData = await fetchProducts();
        const response = await product.getAllProducts()
        console.log(response);
        
        setProducts(response.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    try {
      const response = await axios.post("cart", {
        product_id: selectedProduct.id,
        quantity: quantity, // Send quantity along with product ID
      });

      if (response?.status === 201) {
        setCart([...cart, { ...selectedProduct, quantity }]); // Add to local cart state
        // alert("Product added to cart");
        toast.success("Product added to cart")
        setIsModalOpen(false); // Close modal after adding to cart
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  const defaultImage =
    "https://i.pinimg.com/736x/df/9f/a9/df9fa9eb2ac17ed7794706eb5c7f877c.jpg"; // Pexels default image URL

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Input placeholder="Search products..." className="pl-10 w-full md:w-auto" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Filters:</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Show only the first 5 products */}
          {products.slice(0, 5).map((product) => (
            <Card key={product.id} className="shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <CardHeader className="border-b p-0">
                <img
                  src={product.image || defaultImage} // Use default image if no product image
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{product.productName}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      product.status === "Available" && "bg-green-100 text-green-700",
                      product.status === "Low Stock" && "bg-orange-100 text-orange-700",
                      product.status === "Out" && "bg-red-100 text-red-700"
                    )}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold flex items-center text-gray-800">
                  <IndianRupee size={15} className="mr-1" />
                  {product.price}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-sm text-gray-500">Stock: {product.stock_quantity}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openProductModal(product)} className="text-gray-600 hover:bg-gray-100">
                    <Eye className="h-4 w-4 mr-2" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openOrderModal(product)} // Open order modal on "Order" button click
                    className="text-gray-600 hover:bg-gray-100"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Order
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">{selectedProduct.name}</DialogTitle>
              <DialogDescription className="text-gray-600">Product Details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <img
                src={selectedProduct.image || defaultImage} // Use default image if no product image
                alt={selectedProduct.productName}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="text-gray-700"><strong>Name:</strong> {selectedProduct.productName}</p>
              <p className="text-gray-700"><strong>Category:</strong> {selectedProduct.category}</p>
              <p className="text-gray-700"><strong>Quantity:</strong> {selectedProduct.stock_quantity}</p>
              <p className="text-gray-700"><strong>Price:</strong> {selectedProduct.price}</p>
              <p className="text-gray-700"><strong>Description:</strong> {selectedProduct.description}</p>
              <p className="text-gray-700"><strong>Recent Sales:</strong> {selectedProduct.recentSales}</p>
              <div className="flex gap-4 mt-4">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  min="1"
                  max={selectedProduct.stock_quantity}
                  className="w-24"
                />
                <Button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Order Modal */}
      {selectedProduct && (
        <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
          <DialogContent className="max-w-md bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">Order {selectedProduct.productName}</DialogTitle>
              <DialogDescription className="text-gray-600">Place an order for this product</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-gray-700"><strong>Product:</strong> {selectedProduct.productName}</p>
              <p className="text-gray-700"><strong>Price:</strong> {selectedProduct.price}</p>
              <p className="text-gray-700"><strong>Quantity Available:</strong> {selectedProduct.stock_quantity}</p>
              <div className="flex gap-4 mt-4">
               
                <Link href={`addorder/${selectedProduct.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700">Place Order</Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
