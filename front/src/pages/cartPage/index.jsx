import { ProductCard } from "../../components/main/productCard/ProductCard";
import { useUserData } from "../../context/authDataContext";
import { fetchAuthMe } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from './css/cartPage.module.css';
import Loading from './images/loading.png';
import { useDispatch } from 'react-redux';
import cart from './images/emptycart.png';
import React, { useEffect } from "react";
import { useState } from "react";
import axios from '../../axios'


export const CartPage = () => {
	const dispatch = useDispatch()
	const { userData, updateUserData } = useUserData()
	const [wishList, setWishList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [adress, setAdress] = useState('');
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			if (userData) {
				setWishList(userData.activePreorderedItems);
				setIsLoading(false);
			}
			try {
				if (!userData) {
				  const userDataResult = await dispatch(fetchAuthMe());
				  if (userDataResult.payload) {
					updateUserData(userDataResult.payload);
				  } else {
					navigate('/');
				  }
				}
			  } catch (error) {
				console.error('Error fetching user data:', error);
			  }
		}
		fetchData();
	}, [userData, dispatch]);

	const deleteAll = async () => {
		const response = await axios.post(`/product/remove/all`);
		if (response.status >= 200 && response.status < 300) {
			alert(`Your card was cleared`);
			const actionResult = await dispatch(fetchAuthMe());
			updateUserData(actionResult.payload);
		} else {
		  alert('Something went wrong, try again');
		}
	};

	const createOrder = async () => {
		try {

			if (adress.length <= 10)
			{
				alert('Type your adress');
				return;
			} 

			const response = await axios.post('/product/makeorder', {
				adress: adress
			});
	
			if (response.status === 200) {
				alert('Order was created successfully!');
				const actionResult = await dispatch(fetchAuthMe());
				updateUserData(actionResult.payload);
				navigate('/orders');
			} else {
				alert(`Server responded with status: ${response.status}`);
			}
		}catch (err) {
			console.error(err);
		};
	};
	
	
	
	return (
		<section className={styles.cartPage}>
			<h1 className={styles.title}>
				Cart
			</h1>
			<section style={{justifyContent: (wishList.length ? 'space-between' : 'center')}} className={styles.btnBlock}>
				<Link className={styles.allOrdersBtn} to='/orders'>All orders</Link>
					{wishList.length ? 
					<button onClick={deleteAll} className={styles.deleteAllBtn}>Delete all</button>
					: <></>}
			</section>
			{isLoading ? (
			<section className={styles.loadingBlock}>
				<img src={Loading} alt="loading image" />
				<p>Loading</p>
			</section> ) : (
			wishList.length !== 0 ?( 
			<>
				<section className={styles.prodList}>
					{wishList.map((obj, index) => 
					<section style={{width: '390px'}}>
						<ProductCard
						type='link'
						cart={true}
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
					</section>
					)}
				</section>
				<section className={styles.adressBlock}>
					<input placeholder='adress' id='adress' type="adress" onChange={(e) => setAdress(e.target.value)} value={adress}/>
					<label for='adress'>adress</label>
					<button onClick={createOrder}>Create order: {
						wishList.reduce((total, product) => total + product.price, 0)}
						czk
					</button>
				</section>
			</>)
			: (
			<section className={styles.emptyCartBlock}>
				<img src={cart} alt="empty cart" />
				<h1>Sorry, your cart is empty</h1>
			</section>)
			)}
		</section>
	);
};