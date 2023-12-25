import { useState,useEffect } from 'react'
import { getProductsQuery } from './Services/api'
import './App.css'

function App() {


  useEffect(()=>{

    getProductsQuery()

  })

  return (
    <>

    Hello
    
    
    </>
  )
}

export default App
