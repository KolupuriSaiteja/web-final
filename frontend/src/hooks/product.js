import { useEffect, useState } from 'react';
import axios from 'axios';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:4123/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
};
