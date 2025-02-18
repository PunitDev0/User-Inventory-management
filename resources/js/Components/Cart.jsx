import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee } from 'lucide-react';
import { Link } from '@inertiajs/react';

const CartPage = ({ cartItems }) => {
  const [cart, setCart] = useState([]);

  // Use useEffect to set cart items from props when the component loads
  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const updateQuantity = async (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);

    try {
      // Make API call to update quantity in the database
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cart/update`, {
        product_id: cart[index].product_id,
        quantity: newQuantity,
      });
      console.log('Quantity updated:', response.data.message);
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Optionally, revert the quantity on error
      setCart(cartItems);
    }
  };

  const removeItem = async (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    try {
      // Make API call to remove item from the cart
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cart/remove`, {
        product_id: cart[index].product_id,
      });
      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={item.cart_id} className="flex justify-between items-center border-b py-2">
            <div>
              <h2 className="text-xl">{item.productName}</h2>
              <p className='flex items-center'><IndianRupee size={15}/>{parseFloat(item.price).toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                className="w-16 p-1 border rounded"
                min="1"
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
          <h2 className="text-xl font-bold flex items-center">Total: <IndianRupee size={18}/>{totalPrice.toFixed(2)}</h2>
        </div>
      )}
      {cart.length > 0 && (
        <Link href='/checkout'>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Checkout
        </button>
        </Link>
      )}
    </div>
  );
};

export default CartPage;
