import React from 'react'
import { SpinningCircles } from 'react-loading-icons'
import "./loader.css"
const Loader = ({ loading }) => {
  return (
    <div className={`loader ${loading ? "show" : " "}`}>
      <div className='loaderContainer'>
        <SpinningCircles stroke='#000' speed="1" fill="#000" />
      </div>
    </div>
  )
}

export default Loader