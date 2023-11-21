import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../redux/slices/products";
import { ProductCard } from "../../components/main/productCard/ProductCard";

export const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products, status } = useSelector((state) => state.products);
  const isLoading = (products.status === 'loading')
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      dispatch(fetchProducts())
        .then(() => {
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error('Error loading products:', error);
          setLoading(false);
          setError('Failed to load products');
        });
    };

    fetchData();
  }, [dispatch]);

  console.log('Products:', products);

  return (
    <div>
    
      {(isLoading ? [...Array(5)] : products.items).map((obj, index) => 
          isLoading ? (
          <ProductCard key={index} isLoading={true}/> 
          ) : (
            <ProductCard
              key={index}
              id={obj._id}
              title={obj.title}
              brand={obj.brand}
              product_type={obj.product_type}
              short_description={obj.short_description}
              long_description={obj.long_description}
              parameters={obj.parameters}
              price={obj.price}
              //reviews={obj.reviews}
              />
          ))}    
    </div>
  );
};

export default Home;
