// import axios from 'axios';
// import { Product } from './Functionurl';



// export const Productlist = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}${Product}`);
//     return response.data.products;  
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;  
//   }
// };

import { api } from "./ExiosApi";
import { FunctionUrl } from "./Functionurl";


export const Productlist = async () => {
  const response = await api.get(`${FunctionUrl.Product}?limit=100`);
  return response.data.products;
};



