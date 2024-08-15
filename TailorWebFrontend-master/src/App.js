import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register/Resgiter';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import "./App.css";
import Footer from './components/Footer/Footer';
import Product from './components/Product/Product';
import Cart from "./components/Cart/cart";
import Fabric from './components/Fabric/Fabric';
import Order from './components/Order/Order';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        // Redirect to the login page or home page after logout
        setIsLoggedIn(false);
        // window.location.href = '/login';
      } else {
        console.error('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/fabrics" element={<Fabric />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
