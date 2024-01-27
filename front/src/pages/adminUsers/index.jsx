import { UserCard } from "../../components/main/userCard";
import { fetchAllUsers } from "../../redux/slices/users";
import { useDispatch, useSelector } from 'react-redux';
import styles from './css/adminUsers.module.css';
import React, { useEffect } from "react";

export const AllUsers = () => {
	const { users } = useSelector((state) => state.users);
	const isLoading = (users.status === 'loaded');
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = () => {
			try {
				dispatch(fetchAllUsers());
			} catch (err) {
				console.error(err);
			}
		}

		fetchData();
	}, [dispatch]);


	return (
		<section className={styles.allUsers}>
			<section className={styles.usersList}>
			<h1 className={styles.title}>All users</h1>
			{isLoading ?
			users.items.map((user, index) => {
				return(

					<UserCard
					key={index}
					id={user._id}
					email={user.email}
					fullName={user.fullName}
					lastAct={user.updatedAt}
					wishList={user.activePreorderedItems.length}
					/>
					)
			})
			: <h1>loading</h1>}
			</section>
		</section>
	);
};