import { useState,useEffect } from 'react'
import { getCollectionsQuery } from './Services/api'
import CollectionsList from './pages/collectionsList/CollectionsList'
import ProductList from './pages/productListing/ProductList'
import {BrowserRouter as Router,Route,Routes} from  'react-router-dom'
import Home from './pages/home/Home'
import './App.css'
import ProductPage from './pages/productPage/ProductPage'
import CustomerCreate from './pages/Account/customerCreate/CustomerCreate'

function App() {


  // useEffect(()=>{

  //   getProductsQuery()
  // })

  return (

    <>

        <Router>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/collections-list" element={<CollectionsList />} />
             <Route path="/collections/:handle" element={<ProductList />} />
             <Route path="/products/:handle"  exact element={<ProductPage />}/>
             <Route path="/account/sign-up" element={<CustomerCreate />} />
          </Routes>
        </Router>
        
    </>
  )
}

export default App
