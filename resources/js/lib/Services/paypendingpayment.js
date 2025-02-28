import axios from "axios";

const API_URL = import.meta.env.VITE_ENVIRONMENT === "production"
  ? "https://event.nikatby.in/user/public/api/PayPendingPayment"   // Production API URL
  : "http://127.0.0.1:8001/api/PayPendingPayment";  // Local development API URL




const payment = {
  // Fetch all products
  PendingPayment: async (id, amount) => {
    return axios.post(API_URL,{
        order_id: id,
        payment_amount: amount,
    });
  },
};

export default payment;
