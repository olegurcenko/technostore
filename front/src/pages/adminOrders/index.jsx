import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetcAllOrders } from '../../redux/slices/orders'
import styles from './css/adminOrders.module.css'
import { OrderCard } from '../../components/main/orderCard'
import nothing from './images/nothing.png';
import Loading from './images/loading.png';


export const AdminOrders = () => {
	const {orders, status} = useSelector((state) => state.orders)
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch();
	
	useEffect(() => {
		const fetchData = () => {
			try {

				dispatch(fetcAllOrders())
				setLoading(false)
			} catch (err) {
			  console.error(err);
			};
		};
	
		fetchData();
	}, [dispatch]);
	return (
		<section className={styles.adminOrders}>
			<h2>Orders</h2>
			<section className={styles.ordersList}>
				{!loading ? 
				(orders.items ? orders.items.map((item) => 
				<OrderCard
					id={item._id}
					key={item._id}
					name={item.name}
					adress={item.adress}
					email={item.email}
					items={item.items}
					created={item.updatedAt}
				/>) :
				<section className={styles.noOrdersBlock}>
					<img src={nothing} alt="empty cart" />
					<h1>No orders yet</h1>
				</section>)
 				:
 				<section className={styles.loadingBlock}>
					<img src={Loading} alt="loading image" />
					<p>Loading</p>
				</section>}
			</section>
		</section>
	); 
};