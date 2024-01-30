import React from 'react';
import styles from './css/style.module.css' 
import { useDispatch, useSelector } from 'react-redux';
//import { Navigate } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import { logout, fetchAuthMe, adminLogout } from '../../../redux/slices/auth';
import { useAdminData, useUserData } from '../../../context/authDataContext';

const Popup = ({ onClose }) => {
  const { userData, updateUserData } = useUserData()
  const { adminData, updateAdminData } = useAdminData()
	const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      window.localStorage.removeItem('token');
      if (adminData) {
        dispatch(adminLogout());
        updateAdminData(null)
      } else if (userData) {
        dispatch(logout())
        updateUserData(null)
      }
      onClose()
		}
	};

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.closeBtn} onClick={onClose}>
          &times;
        </span>
        <h1>Menu</h1>
        <div className={styles.linkColumn}>
        <Link to='/product/search/mobile_phone' onClick={onClose}>Smartphones</Link>
        <Link to='/product/search/notebook' onClick={onClose}>Notebooks</Link>
        <Link to='/product/search/tablet' onClick={onClose}>Tablets</Link>
        <Link to='/product/search/accessories' onClick={onClose}>Accessories</Link>
        {userData || adminData ? (<Link to='/' onClick={onClickLogout}>Logout</Link>) : (<Link to='/login' onClick={onClose}>Login</Link>)}
        </div>
      </div>
    </div>
  );
};

export default Popup;