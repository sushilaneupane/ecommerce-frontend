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

const AppRouter = () => {
    return (
        <Routes>
            <Route path = "/" element={<Home />}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/contact-us" element={<CustomerCareForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/sale" element={<SalePage />} />
            <Route path="/store" element={<Stores />} />
            <Route path="/bestSeller" element={< BestSeller/>} />
            <Route path='/products' element={<AllProduct/>} />
        </Routes>
    );
}

export default AppRouter;