import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './css/header.module.css';
import qaimage from './images/question.png';
import logo from './images/logo.png';
import profile from './images/profile.webp';
import cart from './images/cart.png';
import logout_png from './images/logout.png';
import { logout, adminLogout } from '../../redux/slices/auth';
import { useAdminData, useUserData } from '../../context/authDataContext';

export const Header = () => {
	const defaultUserData = {fullName: 'Profile'};
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userData, updateUserData } = useUserData();
	const { adminData, updateAdminData } = useAdminData();
	const [currentUserData, setCurrentUserData] = useState(defaultUserData);
	const [logoutBtnDisplay, setLogoutBtnDisplay] = useState('none');
	const [titleSearch, setTitleSearch] = useState('');
	const [cartState, setCartState] = useState('none');
	const [orderPrice, setOrderPrice] = useState(0);
	const [logoLink, setLogoLink] = useState('/');


	useEffect(() => {
		const fetchData = async () => {
			setOrderPrice(userData ? (userData.activePreorderedItems ? userData.activePreorderedItems.reduce((summ, item) => summ + item.price, 0) : 0) : 0)
			if (userData) {
				setCurrentUserData(userData)
				setLogoutBtnDisplay('flex')
				setLogoLink('/')
				setCartState('block')
			} else if (adminData) {
				setCurrentUserData(adminData)
				setLogoutBtnDisplay('flex')
				setLogoLink('/admin')
				setCartState('none')
			} else {
				setLogoutBtnDisplay('none')
				setCartState('none')
				setCurrentUserData(defaultUserData)
				console.log(currentUserData)
				setLogoLink('/')
			}
		};
		fetchData();
	  }, [userData, adminData]);
	
	  const onClickLogout = () => {
		if (window.confirm('Are you sure you want to leave?')) {
		  window.localStorage.removeItem('token');
		  if (adminData) {
			dispatch(adminLogout());
			updateAdminData(null)
		  } else if (userData) {
			dispatch(logout())
			updateUserData(null)
		  }}
		};

	


	return (
    <>
	<section className={styles.header}>
		<ul className={styles.headerList}>
			{/* Q&A, registration and cart */}
			<li className={styles.firstLine}>
				<Link className={styles.qablock} to='.'>
					<img src={qaimage} alt="" />
					<p>Q&A</p>
				</Link>
				<ul className={styles.profileCartBlock}>
					<li>
						<Link className={styles.profileBlock} to={('/login')}>
							<img src={profile} alt="Profile" />
							<p>{currentUserData ? currentUserData.fullName : 'Profile'}</p>
							<button style={{display: logoutBtnDisplay}} className={styles.logOut} onClick={onClickLogout}>
								<img src={logout_png} alt="" />
							</button>
						</Link>
						
					</li>
					<li
					style={{display: cartState}}
					>
						<section></section>
					</li>
					<li
					style={{display: cartState}}
					>
						<Link 
						className={styles.cartBlock}
						to='/cart'>
							<img src={cart} alt="" />
							<p>{orderPrice} kc</p>
						</Link>
					</li>
				</ul>
			</li>
			
			{/* logo and search btn */}
			<li className={styles.secondLine}>
				<Link to={logoLink} className={styles.logo}>
					<img src={logo} alt="" />
				</Link>
				<ul className={styles.search}>
					<li className={styles.searchInput}>
						<input type="text" value={titleSearch} onChange={(e) => setTitleSearch(e.target.value)}/>
					</li>
					<li className={styles.searchBtn}>
						<Link to={`/product/search/title/${titleSearch}`}>Seacrh</Link>
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
						<Link to='/product/search/accessories'>
							Accessories
						</Link>
					</li>
				</ul>
			</li>
		</ul>
	</section>
	</>
  );
};