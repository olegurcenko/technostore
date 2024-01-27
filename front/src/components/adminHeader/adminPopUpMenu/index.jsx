import React from 'react';
import styles from './css/style.module.css' 
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../redux/slices/auth';
import { useAdminData } from '../../../context/authDataContext';

export const AdminPopup = ({ onClose }) => {
	//const adminData = useSelector((state) => state.adminAuth.data);
  const { adminData, updateAdminData } = useAdminData()
	const dispatch = useDispatch();
  //todo accessories
  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to leave?')) {
      dispatch(adminLogout());
      updateAdminData(null)
			window.localStorage.removeItem('token');
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
        <Link to='/product/search/mobile_phone' onClick={onClose}>Accessories</Link>
        {adminData ? (<Link to='/' onClick={onClickLogout}>Logout</Link>) : (<Link to='/login' onClick={onClose}>Login</Link>)}
        </div>
      </div>
    </div>
  );
};
