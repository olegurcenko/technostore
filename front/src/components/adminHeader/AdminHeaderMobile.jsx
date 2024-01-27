import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './css/adminHeaderMobile.module.css'
import { Link } from "react-router-dom";
import { AdminPopup } from "./adminPopUpMenu";
import menu from './images/menu.png'
import logo from './images/logo.png'
import profile from './images/profile.webp'
import { useAdminData } from '../../context/authDataContext';

export const AdminHeaderMobile = () => {
	const { adminData, updateAdminData } = useAdminData() 
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
			<Link to='/admin'>
				<img src={logo} alt="" />
			</Link>
		</li>
		<li className={styles.profileElem}>
			<Link to={('/admin/login')}>
						<img src={profile} alt="Admin" />
						<p>{adminData ? adminData.fullName.split(' ')[0] : 'Profile'}</p>
			</Link>
		</li>
		<li className={styles.menuOpener}>
			<button onClick={openMenu}>
				<img src={menu} alt="" />
			</button>
		</li>
	</ul>
	{isMenuOpen && <AdminPopup onClose={closeMenu} />}
	</section>
}