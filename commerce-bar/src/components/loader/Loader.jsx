import React from 'react'
import "./loader.css"
const Loader = ({children}) => {
  return (
    <div className='loader'>
       {children}
    </div>
  )
}

export default Loader