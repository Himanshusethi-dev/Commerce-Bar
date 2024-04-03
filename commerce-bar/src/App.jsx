import { useState,useEffect } from 'react'
import { getCollectionsQuery } from './Services/api'
import CollectionsList from './pages/collectionsList/CollectionsList'
import ProductList from './pages/productListing/ProductList'
import {BrowserRouter as Router,Route,Routes} from  'react-router-dom'
import Home from './pages/home/Home'
import './App.css'
import ProductPage from './pages/productPage/ProductPage'

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
             <Route path="/products/:handle"  element={<ProductPage />}/>

          </Routes>
        </Router>
        
    </>
  )
}

export default App
