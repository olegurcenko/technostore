import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

export const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
    //  email: '',
    //  password: '',
    },
    mode: 'onChange'
  });
  
  const onSubmit = async (values) => { 
	try {
	  const actionResult = await dispatch(fetchRegister(values));
	  
	  if (fetchRegister.fulfilled.match(actionResult)) {
		// Если действие успешно выполнено, получаем данные из actionResult.payload
		const { token } = actionResult.payload;
		console.log(actionResult.payload)
		
		if (token) {
		  window.localStorage.setItem('token', token);
		} else {
		  throw new Error('Error while authorization: no token in payload');
		}
	  } else if (fetchRegister.rejected.match(actionResult)) {
		// Если действие было отклонено, обрабатываем ошибку
		throw new Error('Error while registration: ' + actionResult.error.message);
	  } else {
		throw new Error('Unexpected result from fetchRegister');
	  }
	} catch (error) {
	  console.error(error.message);
	  // Handle errors (e.g., show an error message to the user)
	  alert('Error during authorization');
	}
  };
  
  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper>
      <Typography>
        Creating account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<TextField
          label="E-Mail"
          type="email"
          autoComplete="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Your email is empty' })}
          fullWidth
        />
        <TextField 
          label="Password" 
          type="password"
          autoComplete="current-password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Your password is empty' })}
          fullWidth 
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
		*/}
		<input type="text" {...register('fullName')} />
		<input type="password" {...register('password')} />
		<input type="email" {...register('email')} />
		<button type="submit">Submit</button>
      </form>
    </Paper>
  );
};
