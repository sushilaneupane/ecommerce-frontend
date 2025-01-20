import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerCareForm from './pages/CustomerCareForm/CustomerCareForm'
import SalePage from './pages/Sale/Sale';
import LoginForm from './pages/Login/Login';
import Home from './pages/Home/Home';
import RegisterForm from './pages/Login/Register';
import Stores from './pages/Store/Store';
import BestSeller from './pages/Sale/BestSeller';
import AllProduct from './pages/products/AllProducts';
import ProductPage from './pages/products/Product';
import Favourites from './pages/Favourites/Favourite';
import ShoppingCart from './pages/Cart/Cart';
import CategoryPage from './compoents/Category/Category';
import { ToastContainer } from 'react-toastify';

const AppRouter = () => {
    return (
        <>
        <ToastContainer />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/contact-us" element={<CustomerCareForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/store" element={<Stores />} />
            <Route path="/bestSeller" element={<BestSeller />} />
            <Route path='/products' element={<AllProduct />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/category/:categoryId' element={<CategoryPage/>} />
            < Route path='/favourite' element={<Favourites />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
        </>
    );
}

export default AppRouter;