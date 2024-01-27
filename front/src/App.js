import { HeaderMobile } from './components/header/HeaderMobile';
import { ProductPage } from './pages/productPage/ProductPage';
import { ResultsByTitles } from './pages/results_by_titles';
import { ResultsByTypes } from './pages/results_by_types';
import { ImageUploadForm } from './pages/createProduct';
import { AdminProducts } from './pages/adminProducts';
import { AdminRegister } from './pages/adminRegister';
import { Header } from './components/header/Header';
import React, { useState, useEffect } from 'react';
import { AdminOrders } from './pages/adminOrders';
import { Routes, Route } from 'react-router-dom';
import { AllOrders } from './pages/allOrders';
import { AdminHome } from './pages/adminHome';
import { AllUsers } from './pages/adminUsers';
import { Register } from './pages/register';
import { CartPage } from './pages/cartPage';
import { Home } from './pages/home/Home';
import { Login } from './pages/login';


export const App = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsWideScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section>
      {isWideScreen ? (<Header/>) : (<HeaderMobile/>)}
      <Routes>
        <Route path='/product/search/title/:title' element={<ResultsByTitles/>}/>
        <Route path='/product/search/:type' element={<ResultsByTypes/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/products' element={<AdminProducts/>}/>
        <Route path='/admin/create' element={<ImageUploadForm/>}/>
        <Route path='/admin/orders' element={<AdminOrders/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/admin/users' element={<AllUsers/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/orders' element={<AllOrders/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </section>
  );
}