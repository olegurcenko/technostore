import { fetchAdminRegister, selectIsAdminAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Paper from "@mui/material/Paper";
import React from "react";

export const AdminRegister = () => {
  const isAuth = useSelector(selectIsAdminAuth);
  const dispatch = useDispatch();
  
  const { 
    register, 
    handleSubmit, 
  } = useForm({
    defaultValues: {},
    mode: 'onChange'
  });
  
  const onSubmit = async (values) => { 
    try {
    const actionResult = await dispatch(fetchAdminRegister(values));
    
	  if (fetchAdminRegister.fulfilled.match(actionResult)) {
		  const { token } = actionResult.payload;
  		if (token) {
	  	  window.localStorage.setItem('token', token);
		  } else {
		    throw new Error('Error while authorization: no token in payload');
		  }
	  } else if (fetchAdminRegister.rejected.match(actionResult)) {
  		throw new Error('Error while registration: ' + actionResult.error.message);
	  } else {
		  throw new Error('Unexpected result from fetchAdminRegister');
	  }
	  } catch (error) {
	    console.error(error.message);
	    alert('Error during authorization');
	  };
  };
  
  if (isAuth) {
    return <Navigate to='/admin' />;
  };

  return (
    <Paper>
      <Typography>
        Creating account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('fullName')}/>
        <input type="password" {...register('password')}/>
        <input type="email" {...register('email')} />
        <button type="submit">Submit</button>
      </form>
    </Paper>
  );
};
