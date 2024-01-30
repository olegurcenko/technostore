import { useAdminData, useUserData } from '../../context/authDataContext';
import { fetchAdminAuth, fetchAuth } from "../../redux/slices/auth";
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/login.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Paper from "@mui/material/Paper";
import React from "react";

export const Login = () => {
  const { adminData, updateAdminData } = useAdminData();
  const { userData, updateUserData } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
    mode: 'onChange'
  });

  const onSubmit = async (values) => { 
	  try {
	    const actionResult = await dispatch(fetchAuth(values));
    
	    if (fetchAuth.fulfilled.match(actionResult)) {
        const { token } = actionResult.payload;
      
        if (token) {
          window.localStorage.setItem('token', token);
          updateUserData(actionResult.payload);
          navigate('/');
        } else {
          throw new Error('Error while authorization: no token in payload');
        }
      } else if (fetchAuth.rejected.match(actionResult)) {
        throw new Error('Error while authorization: ' + actionResult.error.message);
	    } else {
        throw new Error('Unexpected result from fetchAuth');
	    }
	  } catch (error) {
      try {
        const actionResult = await dispatch(fetchAdminAuth(values));
      
        if (fetchAdminAuth.fulfilled.match(actionResult)) {
          const { token } = actionResult.payload;
          if (token) {
            window.localStorage.setItem('token', token);
            updateAdminData(actionResult.payload)
            navigate('/admin')
          } else {
            throw new Error('Error while authorization: no token in payload');
          }
        } else if (fetchAdminAuth.rejected.match(actionResult)) {
          throw new Error('Error while authorization: ' + actionResult.error.message);
        } else {
          throw new Error('Unexpected result from fetchAuth');
        }
      } catch(error){
        console.error(error.message);
        alert('Error during authorization');
      }
	  }
  };

  return (
    <section className={styles.loginPage}>
      <Paper className={styles.loginBlock}>
        <h1 className={styles.title}>
          Login
        </h1>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='e-mail' id='login' type="text" {...register('email')} />
          <label for='login'>e-mail</label>
          <input placeholder='password' id='password' type="password" {...register('password')} />
          <label for='password'>password</label>
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </Paper>
      <span className={styles.loginLinksBlock}>
        <Link className={styles.loginLink} to='/register'>Dont have Account?</Link>
        {/*<Link className={styles.loginLink} to='/admin/login'>Admin?</Link>*/}
      </span>
    </section>
  );
};
