import { OrderCard } from "../../components/main/orderCard";
import { fetchOrders } from "../../redux/slices/orders";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import styles from './css/allOrders.module.css';
import nothing from './images/nothing.png';


export const AllOrders = () => {
	const {orders, status} = useSelector((state) => state.orders);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = () => {
			try {
				dispatch(fetchOrders());
				setLoading(false);
			} catch (err) {
			  console.error(err);
			};
		};
	
		fetchData();
	  }, [dispatch]);

return (
	<section className={styles.allOrders}>
		<h2>Orders</h2>
		<section className={styles.ordersList}>
		{orders.items.length ? 
		(loading ? [...Array(5)] : orders.items.map((item) => <OrderCard
		id={item._id}
		key={item._id}
		name={item.name}
		adress={item.adress}
		email={item.email}
		items={item.items}
		created={item.updatedAt}
		/>)):
			<section className={styles.noOrdersBlock}>
				<img src={nothing} alt="empty cart" />
				<h1>Sorry, you dont have orders yet</h1>
			</section>}
		</section>
	</section>);
};