import { Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
import { ProductPage } from './pages/productPage/ProductPage';
import { Login } from './pages/login';
import { Register } from './pages/register'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { ResultsByTypes } from './pages/results_by_types/ResultsByTypes';


function App() {

  const dispatch = useDispatch()
  const useAuth = useSelector(selectIsAuth)
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product/search/:type' element={<ResultsByTypes/>}/>
      </Routes>
    </>
  );
}
export default App;