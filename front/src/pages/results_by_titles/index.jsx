import { ProductCard } from "../../components/main/productCard/ProductCard";
import { fetchProductsByTitle } from "../../redux/slices/products";
import { useDispatch, useSelector } from 'react-redux';
import styles from './css/productsByTitles.module.css';
import { useParams } from 'react-router-dom';
import React, { useEffect } from "react";

export const ResultsByTitles = () => {
  const { products, status } = useSelector((state) => state.products);
  const isLoading = (products.status === 'loading');
  const dispatch = useDispatch();
  const { title } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchProductsByTitle(title));
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchData();
  }, [dispatch, title]);
  
  return (
    <section className={styles.resultsByTitles}>
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
