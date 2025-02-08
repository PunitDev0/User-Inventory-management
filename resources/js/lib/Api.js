import axios from 'axios';

export const fetchProducts = async (id) => {
    try {
      const response = await axios.get(`/getproducts`,{
        params:{
            'id':id
        }
      });
      console.log(response);
      if(response?.data?.product){
        return response?.data?.product; // Ensure this matches the Laravel API response
      }else{
        return response?.data?.products; // Ensure this matches the Laravel API response

      }
      
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  };