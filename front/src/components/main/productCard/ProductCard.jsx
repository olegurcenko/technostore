import React from "react";
import axios from '../../../axios'
import { Link } from "react-router-dom";
import styles from './css/productCard.module.css'

export const ProductCard = ({
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

	if (isLoading) {
		return <div>loading</div>
	}
	return <section className={styles.productCard}>
	<Link>
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