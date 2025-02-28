import axios from "axios";

const API_URL = import.meta.env.VITE_ENVIRONMENT === "production"
  ? "https://event.nikatby.in/user/public/api/products"   // Production API URL
  : "http://127.0.0.1:8001/api/products";  // Local development API URL

const Category_URL = import.meta.env.VITE_ENVIRONMENT === "production"
  ? "https://event.nikatby.in/user/public/api/categories"   // Production API URL
  : "http://127.0.0.1:8001/api/categories";  // Local development API URL



const product = {
  // Fetch all products
  getAllProducts: async () => {
    return axios.get(API_URL);
  },
  getCategories: async ()=>{
  return axios.get(Category_URL);
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
