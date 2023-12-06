import React from "react";
import { Link } from "react-router-dom";
import styles from './css/header.module.css'
import qaimage from './images/question.png'
import logo from './images/logo.png'
import profile from './images/profile.webp'
import cart from './images/cart.png'
import logout_png from './images/logout.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../redux/slices/auth";

export const Header = (props) => {
	
	
	const dispatch = useDispatch()
	const userData = useSelector((state) => state.auth.data)
	const orderPrice = userData ? userData.activePreorderedItems.reduce((summ, item) => summ + item.price, 0) : 0 

	
	const onClickLogout = () => {
		if (window.confirm("Are you sure you want to leave?"))
		{
			dispatch(logout())
			window.localStorage.removeItem("token")
		}
	}
	return <section className={styles.header}>
		<ul className={styles.headerList}>
			{/* Q&A, registration and cart */}
			
			<li className={styles.firstLine}>
				<Link className={styles.qablock} to='.'>
					<img src={qaimage} alt="" />
					<p>Q&A</p>
				</Link>
				<ul className={styles.profileCartBlock}>
					<li>
						<Link className={styles.profileBlock} to='/login'>
							<img src={profile} alt="" />
							<p>{userData ? userData.fullName : 'Profile'}</p>
							{userData ? 
							<button onClick={onClickLogout}>
								<img src={logout_png} alt="" />
							</button> : 
							<></>}
						</Link>
						
					</li>
					<li>
						<section></section>
					</li>
					<li>
						<Link className={styles.cartBlock}>
							<img src={cart} alt="" />
							<p>{orderPrice} kc</p>
						</Link>
					</li>
				</ul>
			</li>
			
			{/* logo and search btn */}
			<li className={styles.secondLine}>
				<Link to='/' className={styles.logo}>
					<img src={logo} alt="" />
				</Link>
				<ul className={styles.search}>
					<li className={styles.searchInput}>
						<input type="text" />
					</li>
					<li className={styles.searchBtn}>
						<button>Seacrh</button>
					</li>
				</ul>
			</li>
			
			{/* categories */}
			<li className={styles.thirdLine}>
				<ul className={styles.categories}>
					<li>
						<Link to='/product/search/mobile_phone'>
							Smartphones
						</Link>						
					</li>
					<li>
						<Link to='/product/search/notebook'>
							Notebooks
						</Link>						
					</li>
					<li>
						<Link to='/product/search/tablet'>
							Tablets
						</Link>						
					</li>
					<li>
						<Link>
							Headphones
						</Link>
					</li>
					<li>
						<Link>
							Accessories
						</Link>
					</li>
				</ul>
			</li>
		</ul>
	</section>
}