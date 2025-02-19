import axios from "axios";

const API_URL = "/api/products"; // Update with actual API URL

const product = {
  // Fetch all products
  getAllProducts: async () => {
    return axios.get(API_URL);
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },
};

export default product;
