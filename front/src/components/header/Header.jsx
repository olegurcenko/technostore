import React from "react";
import { Link } from "react-router-dom";
import styles from './css/header.module.css'
import qaimage from './images/question.png'
import logo from './images/logo.png'
import profile from './images/profile.webp'
import cart from './images/cart.png'
import './css/normalise.css'

export const Header = (props) => {
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
						<Link className={styles.profileBlock}>
							<img src={profile} alt="" />
							<p>Profile</p>
						</Link>
					</li>
					<li>
						<section></section>
					</li>
					<li>
						<Link className={styles.cartBlock}>
							<img src={cart} alt="" />
							<p>1 230 kc</p>
						</Link>
					</li>
				</ul>
			</li>
			{/* logo and search btn */}
			<li className={styles.secondLine}>
				<Link className={styles.logo}>
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
						<Link>
							Smartphones
						</Link>						
					</li>
					<li>
						<Link>
							Notebooks
						</Link>						
					</li>
					<li>
						<Link>
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