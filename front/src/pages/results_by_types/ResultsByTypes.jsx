import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByType } from "../../redux/slices/products";
import { useParams } from 'react-router-dom';
import { ProductCard } from "../../components/main/productCard/ProductCard";

export const ResultsByTypes = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products, status } = useSelector((state) => state.products);
  const { type } = useParams()
  const isLoading = (products.status === 'loading')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchProductsByType(type));
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
        setError('Failed to load products');
      }
    };

    fetchData();
  }, [dispatch, type]); // Include 'type' as a dependency

  console.log(userData)
  console.log('Products:', products);

  return (
    <div>
      {(isLoading || !products.items ? [...Array(5)] : products.items).map((obj, index) => 
          isLoading || !products.items ? (
          <ProductCard key={index} isLoading={true}/> 
          ) : (
            <ProductCard
              type='link'
              key={index}
              id={obj._id}
              title={obj.title}
              brand={obj.brand}
              product_type={obj.product_type}
              short_description={obj.short_description}
              long_description={obj.long_description}
              parameters={obj.parameters}
              price={obj.price}
            />
          ))}
    </div>
  );
};
