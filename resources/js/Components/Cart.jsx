import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';
import { Link } from '@inertiajs/react';

const CartPage = ({ cartItems }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(cartItems || []);
  }, [cartItems]);

  const updateQuantity = async (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);

    try {
      await axios.put('cart/update', {
        product_id: cart[index]?.product_id,
        quantity: newQuantity,
      });
      console.log('Quantity updated successfully');
    } catch (error) {
      console.error('Error updating quantity:', error);
      setCart(cartItems || []);
    }
  };

  const removeItem = async (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    try {
      await axios.delete('cart/remove', {
        params: { product_id: cart[index]?.product_id },
      });
      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + (parseFloat(item?.product?.price) || 0) * (item?.quantity || 0), 0);

  const isOutOfStock = cart.some(item => item?.product?.stock_quantity === 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={item?.id} className="flex justify-between items-center border-b py-2">
            <div>
              <h2 className="text-xl">{item?.product?.productName}</h2>
              <p className="flex items-center">
                <IndianRupee size={15} />
                {parseFloat(item?.product?.price)?.toFixed(2) || '0.00'}
              </p>
              {item?.product?.stock_quantity === 0 ? (
                <p className="text-red-500">Out of Stock</p>
              ) : (
                <p className="text-green-500">In Stock</p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={item?.quantity || 1}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                className="w-16 p-1 border rounded"
                min="1"
                disabled={item?.product?.stock_quantity === 0}
              />
              <button
                onClick={() => removeItem(index)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold flex items-center">
            Total: <IndianRupee size={18} />
            {totalPrice.toFixed(2)}
          </h2>
        </div>
      )}
      {cart.length > 0 && (
        <Link href="checkout">
          <button
            disabled={isOutOfStock}
            className={`mt-4 px-4 py-2 rounded ${isOutOfStock ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartPage;
