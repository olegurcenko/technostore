import React from "react"
import styles from './css/orderCard.module.css'

export const OrderCard = ({
	id,
	name,
	adress,
	email,
	items,
	created
}) => {
	//console.log(items)
	let i = 0
	let summ = 0
	while(items[i])
	{
		summ += items[i].price
		i++
	}
	return (

	<section className={styles.orderCard}>
		<span>
		<p className={styles.preDataInfo}>ID:</p>
		<p className={styles.id}>
			{id}
		</p>
		</span>
		<span>
		<p className={styles.preDataInfo}>Name:</p>
		<p>
			{name}
		</p>
		</span>
		<span>
		<p className={styles.preDataInfo}>Address:</p>
		<p>
			{adress}
		</p>
		</span>
		<span>
		<p className={styles.preDataInfo}>E-mail:</p>
		<p>
			{email}
		</p>
		</span>
		<span>
		<p className={styles.preDataInfo}>Price:</p>
		<p>
			{summ}
		</p>
		</span>
		<span className={styles.itemsBlock}>
			<p className={styles.preDataInfo}>Items:</p>
			<ul>
				{items.map((item) => <p className={styles.item}>{item.title}</p>)}
			</ul>
		</span>
		<span>
		<p className={styles.preDataInfo}>Created:</p>
		<p>
			{created.slice(0,10)}
			{` in ${created.slice(11, 16)}`}
		</p>
		</span>
	</section>
	)
}