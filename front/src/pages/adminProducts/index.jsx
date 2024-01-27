import { ProductCard } from "../../components/main/productCard/ProductCard";
import { useAdminData } from '../../context/authDataContext';
import { fetchProducts } from '../../redux/slices/products';
import { fetchAuthAdminMe } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import styles from './css/adminProducts.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export const AdminProducts = () => {
	const { products } = useSelector((state) => state.products);
	const { adminData, updateAdminData } = useAdminData();
	const isLoading = (products.status === 'loading');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(fetchProducts());
				if (!adminData) {
					const adminDataResult = await dispatch(fetchAuthAdminMe());
					if (adminDataResult.payload) {
					  updateAdminData(adminDataResult.payload);
					} else {
					  navigate('/');
					}
				  }
			} catch(err) {
				console.error(`Error loading products: ${err}`)
			}
		}
		fetchData();
	}, [dispatch]);

	return (
	<section className={styles.adminProducts}>
		<section className={styles.prodList}>
		{(isLoading || !products.items ? [...Array(6)] : products.items).map((obj, index) => 
          isLoading || !products.items ? (
			  <ProductCard key={index} isLoading={true}/> 
			  ) : (
				  <ProductCard
              type='link'
              key={index}
              isLoading={false}
              id={obj._id}
              title={obj.title}
              brand={obj.brand}
              product_type={obj.product_type}
              short_description={obj.short_description}
              long_description={obj.long_description}
              parameters={obj.parameters}
              price={obj.price}
              images={obj.images}
              reviews={obj.reviews}
              />
			  ))}
		</section>
	</section>
	);
};