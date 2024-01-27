import React from "react";
import axios from '../../../axios'
import { Link } from "react-router-dom";
import styles from './css/productCard.module.css'
//import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getBaseUrl } from '../../../axios'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './css/productCard.css'
import { useAdminData, useUserData } from "../../../context/authDataContext";
import { adminLogout, fetchAuthMe } from "../../../redux/slices/auth";
import Skeleton from "@mui/material/Skeleton";
import { fetchProducts } from "../../../redux/slices/products";


export const ProductCard = ({
	id,
	cart,
	type,
	title,
	brand, 
	product_type,
	short_description,
	long_description,
	parameters, 
	price,
	//reviews, 
	images,
	isLoading,
}) => {
	const { userData, updateUserData } = useUserData()
	const { adminData, updateAdminData } = useAdminData()
	const baseUrl = getBaseUrl()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const addItemOnClick = async () => {
			const response = await axios.post(`/product/add/${id}`);
			if (response.status >= 200 && response.status < 300) {
				alert(`${title} was added in your cart`);
				const actionResult = await dispatch(fetchAuthMe());
				updateUserData(actionResult.payload)
				navigate('/')
			} else {
			  alert('Something went wrong, try again');
			}
	  };

	const loginAsk = () => {
		if (!adminData){
			if (window.confirm('Do you want login to continue?'))
			{
				navigate('/login')
			}
		} else if (adminData) {
			if (window.confirm('Do you want login as user to continue?'))
			{
				updateAdminData(null)
				window.localStorage.removeItem('token');
				dispatch(adminLogout())
				navigate('/login')
			}
		}
	}
	  
	const deleteProduct = async () => {
		const response = await axios.post(`/product/remove/${id}`);
		if (response.status >= 200 && response.status < 300) {
			alert(`${title} was removed from your cart`);
			const actionResult = await dispatch(fetchAuthMe());
			updateUserData(actionResult.payload)
		} else {
		  alert('Something went wrong, try again');
		}
  	};

  	const vanishProduct = async () => {
		const response = await axios.post(`/product/${id}`)
		if (response.status >= 200 && response.status < 300) {
			alert(`${title} was removed from products`)
			dispatch(fetchProducts())
		} else {
			alert('Something went wrong, try again');
	  	}
  	}

	if (isLoading) {
		return (
		<section className={styles.productCard}>
			<section className={styles.imageBlock}>
				<Skeleton variant="rounded" animation='wave' width={350} height={200} />
			</section>
			<Link className={styles.linkData} to={`/product/${id}`}>
				<span className={styles.topLine}>
					<Skeleton className={styles.title} variant="text" sx={{ fontSize: '24px' }} width={120}/>
					<Skeleton className={styles.brand} variant="text" sx={{ fontSize: '12px' }} width={40}/>
				</span>
			</Link>
			<span className={styles.botLine}>
				<button className={styles.priceBtn} >
					<Skeleton className={styles.brand} width={40} variant="text" sx={{ fontSize: '14px' }} />
				</button>
			</span>
		</section>
	)
	}
	else {
		return (
		<section className={styles.productCard}>
				{adminData ? <button className={styles.deleteButton} onClick={vanishProduct}>X</button> : <></>}
				<section className={styles.imageBlock}>
					{images ? 
					(Array.isArray(images) ? 
						<Carousel>
							{images.map((image) => <img src={`${baseUrl}${image}`} alt="" />)}
						</Carousel> : 
						<img src={`${baseUrl}${images}`} alt="" />) 
						: <Skeleton variant="rounded" animation='wave' width={350} height={200} />}
				</section>
				<Link className={styles.linkData} to={`/product/${id}`}>
					<span className={styles.topLine}>
						<p className={styles.title}>
							{title.split(' ').slice(0, 4).join(' ')}
						</p>
						<p className={styles.brand}>
							{brand}	
						</p>
					</span>
				</Link>
				<span className={styles.botLine}>
					<button className={styles.priceBtn} 
						onClick={cart ? deleteProduct : (userData ? addItemOnClick : loginAsk)}>
						{cart ? 'X' : price}
					</button>
				</span>
			</section>
)}}