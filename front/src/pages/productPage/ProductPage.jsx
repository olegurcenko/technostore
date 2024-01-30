import { useAdminData, useUserData } from "../../context/authDataContext";
import { adminLogout, fetchAuthMe } from "../../redux/slices/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from './css/productCard.module.css';
import './css/productCard.css';
import axios, { getBaseUrl } from '../../axios';
import Skeleton from "@mui/material/Skeleton";
import { useDispatch } from 'react-redux';
import React, { useState } from "react";

export const ProductPage = () => {
	const {adminData, updateAdminData} = useAdminData();
	const {userData, updateUserData} = useUserData();
	const [isLoading, setLoading] = useState(true);
	const [product, setProduct] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const baseUrl = getBaseUrl();
	//const baseUrl = 'http://localhost:4444'
	const {id} = useParams();

	React.useEffect(() => {
		axios
			.get(`/product/${id}`)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})

			.catch((err) => {
				console.warn(err);
			})
	}, [id]);

	const addItemOnClick = async () => {
		const response = await axios.post(`/product/add/${id}`);

		if (response.status >= 200 && response.status < 300) {
			alert(`${product.title} was added in your cart`);
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
				navigate('/login');
			}
		} else if (adminData) {
			if (window.confirm('Do you want login as user to continue?'))
			{
				window.localStorage.removeItem('token');
				dispatch(adminLogout());
				updateAdminData(null);
				navigate('/login');
			}
		}
	};


	return (!isLoading ? 
		<section className={styles.productPage}>
			<section className={styles.carouselBlock}>
			<section className={styles.imageBlock}>
					{product.images ? 
						<Carousel className="carouselCustom">
							{product.images.map((image) => <img src={`${baseUrl}${image}`} alt="" />)}
						</Carousel> : 
						<Skeleton className={styles.skeletonImage} variant="rounded" animation='wave'/>}
				</section>
				<span className={styles.carouselText}>
				<span className={styles.titleText}>
					<p className={styles.title}>{product.title}</p>
					<p className={styles.brand}>{product.brand}</p>
				</span>
				<button onClick={(userData ? addItemOnClick : loginAsk)} className={styles.buyButton}>
						<p className={styles.addBtn}>Add to cart</p>
				</button>
				</span>
			</section>
			<section className={styles.infoBlock}>
				<p className={styles.shortDescr}>{product.short_description}</p>
				<p className={styles.longDescr}>{product.long_description}</p>
			</section>
		</section>
		: 
		<section className={styles.productPage}>
			<section className={styles.carouselBlock}>
				<Skeleton className={styles.skeletonImage} variant="rounded" animation='wave'/>
				<span className={styles.carouselText}>
				<span className={styles.titleText}>
				<Skeleton className={styles.title} variant="text" sx={{ fontSize: '36px' }} width={300}/>
				<Skeleton className={styles.brand} variant="text" sx={{ fontSize: '16px' }} width={120}/>
				</span>
				<button className={styles.buyButton}>
				<Skeleton className={styles.title} variant="text" sx={{ fontSize: '36px' }} width={300}/>
				</button>
				</span>
			</section>
			<section className={styles.infoBlock}>
				<Skeleton className={styles.shortDescr} variant="rounded" width={390} height={200}/>
				<Skeleton className={styles.longDescr} variant="rounded" width={390} height={420}/>
			</section>
		</section>
		)
}