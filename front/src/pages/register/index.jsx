import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchRegister } from "../../redux/slices/auth";
import Paper from "@mui/material/Paper";
import styles from './css/register.module.css'
import { useUserData } from "../../context/authDataContext";

export const Register = () => {
  const { userData, updateUserData } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {},
    mode: 'onChange'
  });
  
  const onSubmit = async (values) => { 
	try {
	  const actionResult = await dispatch(fetchRegister(values));
	  
	  if (fetchRegister.fulfilled.match(actionResult)) {

      const { token } = actionResult.payload;
		
  		if (token) {
	  	  window.localStorage.setItem('token', token);
        updateUserData(actionResult.payload);
        navigate('/');
      } else {
        throw new Error('Error while authorization: no token in payload');
      }
    } else if (fetchRegister.rejected.match(actionResult)) {
      throw new Error('Error while registration: ' + actionResult.error.message);
	  } else {
      throw new Error('Unexpected result from fetchRegister');
	  }
	} catch (error) {
	  console.error(error.message);
	  alert('Error during authorization');
	}
  };

  return (
    <section className={styles.registerPage}>
      <Paper className={styles.registerBlock}>
        <h1 className={styles.title}>
          Creating account
        </h1>
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='name' type="text" id="fullname" {...register('fullName')} />
          <label for='fullname'>name</label>
          <input placeholder='e-mail' type="email" {...register('email')} />
          <label for='login'>e-mail</label>
          <input placeholder='password' type="password" id="password" {...register('password')} />
          <label for='password'>password</label>
          <span>
            <button type="submit">Submit</button>
          </span>
        </form>
      </Paper>
    </section>
  );
};
