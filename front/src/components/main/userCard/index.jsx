import React from "react";
import { CopyButton } from "./copyBtn";
import profile from './images/profile.webp'
import styles from './css/userCard.module.css'
import { Link } from "react-router-dom";

export const UserCard = ({
	id,
	email,
	fullName,
	lastAct,
	wishList
}) => {

const timestamp = new Date(lastAct);

// Current time
const currentTime = new Date();

// Calculate the time difference in milliseconds
const timeDifference = currentTime - timestamp;

// Function to convert milliseconds to a human-readable format
function formatTimeDifference(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);

  if (seconds < 60) {
    return "Just now";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

// Print the result
const formattedTimeDifference = formatTimeDifference(timeDifference);

	return (
		<section className={styles.userCard}>
			<section className={styles.topInfo}>
				<img className={styles.profilePhoto} src={profile} alt="" />
				<ul className={styles.topInfoText}>
					<li className={styles.topLine}>
						<p>
							{fullName}
						</p>
						<CopyButton textToCopy={id}/>
					</li>
					<li className={styles.midLine}>
						<p>
							{email}
						</p>
					</li>
					<li className={styles.botLine}>
						<p>
							Last activity: {formattedTimeDifference}
						</p>
					</li>
				</ul>
			</section>
			<section className={styles.bottomInfo}>
				<p>Items in cart: {wishList}</p>
				<Link>Chat</Link>
			</section>
		</section>
	)
}