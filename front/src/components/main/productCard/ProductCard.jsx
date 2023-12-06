import React from "react";
import axios from '../../../axios'
import { Link } from "react-router-dom";
import styles from './css/productCard.module.css'
import { useParams } from 'react-router-dom';

export const ProductCard = ({
	id,
	type,
	title,
	brand, 
	product_type,
	short_description,
	long_description,
	parameters, 
	price,
	//reviews, 
	//images,
	isLoading,
}) => {
	const id_for_req = useParams()
	console.log(id_for_req)
	const addItemOnClick = async () => {
			const response = await axios.post(`/product/add/${id_for_req.id}`);
			
			if (response.status >= 200 && response.status < 300) {
			  alert(`${title} was added in your cart`);
			} else {
			  alert('Something went wrong, try again');
			}
	  };
	  


	if (isLoading) {
		return <div>loading</div>
	}
	if (type=='link') {
		return <section className={styles.productCard}>
	<Link to={`/product/${id}`}>
		<h1>
			{title}
		</h1>
		<h1>
			{price}
		</h1>
		<h1>
			{brand}			
		</h1>
		<h1>
			{product_type}
		</h1>
		<h1>
			{short_description}
		</h1>
		<h1>
			{long_description}
		</h1>
		<h1>
			{parameters}
		</h1>
		{/*{reviews}*/}
		{/*{images}*/}
	</Link>
	</section>
	}
	return <section className={styles.productCard}>
		<button onClick={addItemOnClick}>
			+
		</button>
		<h1>
			{title}
		</h1>
		<h1>
			{price}
		</h1>
		<h1>
			{brand}			
		</h1>
		<h1>
			{product_type}
		</h1>
		<h1>
			{short_description}
		</h1>
		<h1>
			{long_description}
		</h1>
		<h1>
			{parameters}
		</h1>
		{/*{reviews}*/}
		{/*{images}*/}
	</section>
}