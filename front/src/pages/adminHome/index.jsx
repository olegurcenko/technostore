import { useAdminData } from "../../context/authDataContext";
import { fetchAuthAdminMe } from "../../redux/slices/auth";
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/adminHome.module.css';
import { useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import React, { useEffect} from "react";

export const AdminHome = () => {
	const {adminData, updateAdminData} = useAdminData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!adminData) {
          const adminDataResult = await dispatch(fetchAuthAdminMe());
          if (adminDataResult.payload) {
            updateAdminData(adminDataResult.payload);
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.adminHome}>
      <section className={styles.adminMenu}>
        <li>
          <Link to="products">Products</Link>
        </li>
        <li>
          <Link to="orders">Orders</Link>
        </li>
        <li>
          <Link to='users'>Users</Link>
        </li>
      </section>
      <Draggable>
        <div className={styles.movableLink}>
          <Link to={'/admin/create'}>+</Link>
        </div>
      </Draggable>
    </section>
  );
};