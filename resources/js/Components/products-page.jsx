import { useEffect, useState } from "react";
import { Eye, Filter, IndianRupee, Plus, ShoppingCart } from "lucide-react";
import cn from "classnames";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchProducts } from "@/lib/Api";
import { Link } from "@inertiajs/react";

export function ProductsPage() {
  const [filter, setFilter] = useState("All Categories");
  const [status, setStatus] = useState("all");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // State for order modal

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        console.log(productsData);
        
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

  const defaultImage =
    "https://i.pinimg.com/736x/df/9f/a9/df9fa9eb2ac17ed7794706eb5c7f877c.jpg"; // Pexels default image URL

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Input placeholder="Search products..." className="pl-10" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filters:</span>
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
          {products?.map((product) => (
            <Card key={product.id} className="shadow-lg hover:shadow-xl transition">
              <CardHeader className="border-b p-0">
                <img
                  src={product.image || defaultImage} // Use default image if no product image
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
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
                <p className="mt-2 text-lg font-bold flex items-center"><IndianRupee size={15}/>{product.price}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-sm text-muted-foreground">Stock: {product.stock_quantity}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openProductModal(product)}>
                    <Eye className="h-4 w-4" /> View Details
                  </Button>
                  <Link className="flex items-center gap-2 text-sm bg-green-500 rounded-xl p-2" href={`/addorder/${product.id}`}>
                    <ShoppingCart className="h-4 w-4" /> Order
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>Product Details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <img
                src={selectedProduct.image || defaultImage} // Use default image if no product image
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Quantity:</strong> {selectedProduct.stock_quantity}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Recent Sales:</strong> {selectedProduct.recentSales}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Order Modal */}
      {selectedProduct && (
        <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Order {selectedProduct.name}</DialogTitle>
              <DialogDescription>Place an order for this product</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p><strong>Product:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Quantity Available:</strong> {selectedProduct.quantity}</p>

              {/* You can add an order form here */}
              <Button className="w-full">Place Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
