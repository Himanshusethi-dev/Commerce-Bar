import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './banner.css'

const views = {
  desktop: 'desktop',
  mobile: 'mobile'
}
const Banner = ({ img, mobImg }) => {
  const [view, setView] = useState(() => {
    if (window.innerWidth >= 768) {
      return views.desktop;
    } else {
      return views.mobile;
    }
  })

  useEffect(() => {
    const checkWindowSize = () => {
      window.innerWidth <= 767 && setView(views.mobile);
      window.innerWidth >= 768 && setView(views.desktop)
    }
    window.addEventListener('resize', checkWindowSize)
  }, [])
  useEffect(()=>{
      console.log("view",view)
  },[view])
  return (
    <div className='bannerImage'>
      <Link to={'/collections-list'}>
        {
          view === views.desktop ? (
            <img src={img} alt="" />
          ) : (
            <img src={mobImg} alt="" />
          ) 
        }

      </Link>

    </div>
  )
}

export default Banner