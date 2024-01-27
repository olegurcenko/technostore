import { ProductCard } from "../../components/main/productCard/ProductCard";
import { fetchProducts } from "../../redux/slices/products";
import { useDispatch, useSelector } from 'react-redux';
import styles from './css/home.module.css';
import React, { useEffect } from "react";

export const Home = () => {
  const { products } = useSelector((state) => state.products);
  const isLoading = (products.status === 'loading');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(fetchProducts())
      } catch(error) {
          console.error('Error loading products:', error);
        };
    };

    fetchData();
  }, [dispatch]);
  
  return (
    <section className={styles.homePage}>
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
