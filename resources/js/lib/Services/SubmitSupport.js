import axios from "axios";

export const submitSupportRequest = async (supportData) => {
  try {
    const response = await axios.post("/api/support", supportData, {
      headers: {
        "Content-Type": "application/json",
        // Add authentication if needed
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const submitSupport = async () => {
  try {
    const response = await axios.get("/api/support");
    return response.data;
  } catch (error) {
    throw error;
  }
};