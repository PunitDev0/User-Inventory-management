import axios from "axios";

const API_URL = "api/order"; // Adjust if needed

const ordersService = {
  // Fetch all orders
  getAllOrders: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Fetch user-specific orders
  getUserOrders: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/order`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  // Fetch a single order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  // Place a new order
  placeOrder: async (orderData) => {
    try {
      const response = await axios.post(API_URL, orderData);
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },

  // Update order payment
  updatePayment: async (orderId, paymentAmount) => {
    try {
      const response = await axios.put(`${API_URL}/${orderId}`, { payment_amount: paymentAmount });
      return response.data;
    } catch (error) {
      console.error(`Error updating payment for order ${orderId}:`, error);
      throw error;
    }
  },

  // Delete an order
  cancelOrder: async (orderId) => {
    try {
      const response = await axios.post(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting order ${orderId}:`, error);
      throw error;
    }
  },
};

export default ordersService;
