import { useState, useEffect } from 'react'
import { getCollectionsQuery } from './Services/api'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionsList from './pages/collectionsList/CollectionsList'
import ProductList from './pages/productListing/ProductList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import './App.css'
import ProductPage from './pages/productPage/ProductPage'
import Header from './components/header/Header';
import Register from './pages/Account/Register';
import Login from './pages/Account/Login';
import Customer from './pages/Account/Customer';
import useCartFunctions from "./hooks/useCartFunctions"
// import  {getCartByID} 

import Cart from './pages/cart/Cart';

function App() {
  
  useCartFunctions();
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections-list" element={<CollectionsList />} />
          <Route path="/collections/:handle" element={<ProductList />} />
          <Route path="/products/:handle" exact element={<ProductPage />} />
          <Route path="/account/login" element={<Login />} />
          <Route path='/account/signup' element={<Register />} />
          <Route path='/account/profile' element={<Customer />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
