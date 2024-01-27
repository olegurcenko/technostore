import { ProductCard } from "../../components/main/productCard/ProductCard";
import { fetchProductsByType } from "../../redux/slices/products";
import { useDispatch, useSelector } from 'react-redux';
import styles from './css/resultByTypes.module.css';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export const ResultsByTypes = () => {
  const { products, status } = useSelector((state) => state.products);
  const userData = useSelector((state) => state.auth.data);
  const isLoading = (products.status === 'loading');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        dispatch(fetchProductsByType(type));
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, type]);
  
  return (
    <section className={styles.resultsByTypes}>
      <h1 className={styles.typeTitle}>{type.toUpperCase().replace('_', ' ') + 'S'}</h1>
      <section className={styles.prodList}>
        {(isLoading || !products.items ? [...Array(6)] : products.items).map((obj, index) => 
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
              images={obj.images}
              />
              ))}
      </section>
    </section>
  );
};
