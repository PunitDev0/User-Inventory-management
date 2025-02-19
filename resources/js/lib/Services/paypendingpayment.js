import axios from "axios";

const API_URL = "api/PayPendingPayment"; // Update with actual API URL

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
