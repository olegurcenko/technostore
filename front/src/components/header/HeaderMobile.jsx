import React, { useEffect, useState } from 'react';
import menu from './images/menu.png'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './css/header.module.css';
import logo from './images/logo.png';
import profile from './images/profile.webp';
import cart from './images/cart.png';
import Popup from './popUpMenu';
import { fetchAuthMe } from '../../redux/slices/auth';
import { useAdminData, useUserData } from '../../context/authDataContext';


export const HeaderMobile = () => {

	const { userData, updateUserData } = useUserData()
	const { adminData, setAdminData } = useAdminData()
	const [cartState, setCartState] = useState('block')
	const defaultUserData = {
		fullName: 'Profile'
	}
	const [orderPrice, setOrderPrice] = useState(0);
	const [titleSearch, setTitleSearch] = useState('')
	const [currentUserData, setCurrentUserData] = useState(defaultUserData)

	useEffect(() => {
		const fetchData = async () => {
			setOrderPrice(userData ? (userData.activePreorderedItems ? userData.activePreorderedItems.reduce((summ, item) => summ + item.price, 0) : 0) : 0)
			if (userData) {
				setCurrentUserData(userData)
				setCartState('block')
			} else if (adminData) {
				setCurrentUserData(adminData)
				setCartState('none')
			} else {
				setCurrentUserData(defaultUserData)
			}
		};
		fetchData();
	  }, [userData, adminData]);

	const [isMenuOpen, setMenuOpen] = useState(false)

	const openMenu = () => {
		setMenuOpen(true)
	}

	const closeMenu = () => {
		setMenuOpen(false)
	}

	return <section className={styles.headerMobile}>
	<ul className={styles.headerFirstRow}>
		<li className={styles.logoLink}>
			<Link to='/'>
				<img src={logo} alt="" />
			</Link>
		</li>
		<li className={styles.profileElem}>
			<Link to={('/login')}>
						<img src={profile} alt="Profile" />
						<p>{currentUserData ? currentUserData.fullName.split(' ')[0] : 'Profile'}</p>
			</Link>
		</li>
		<li style={{display: cartState}} className={styles.cartElem}>
			<Link 
				to={'/cart'}>
				<img src={cart} alt="" />
				<p>{orderPrice} kc</p>
			</Link>
		</li>
		<li className={styles.menuOpener}>
			<button onClick={openMenu}>
				<img src={menu} alt="" />
			</button>
		</li>
	</ul>
	<div className={styles.search}>
    <input type="text" className={styles.search__input} placeholder="Type here title" value={titleSearch} onChange={(e) => setTitleSearch(e.target.value)}/>
    <Link className={styles.search__button} to={`/product/search/title/${titleSearch}`}>
        <svg className={styles.search__icon} aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
    </Link>
	</div>
	{isMenuOpen && <Popup onClose={closeMenu} />}
</section>

}
export const exportableUpdateOrderPrice = async (dispatch) => {
	try {
	  await dispatch(fetchAuthMe());
	} catch (error) {
	  console.error('Error updating order price:', error);
	}
  };