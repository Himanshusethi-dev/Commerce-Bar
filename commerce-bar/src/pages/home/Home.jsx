import React from 'react'
import { Link } from 'react-router-dom'
import CollectionsList from '../collectionsList/CollectionsList'
import Banner from '../../components/common/banner/Banner'
import banner3 from '../../assets/banner3.jpg'
import banner3Mob from '../../assets/banner3Mob.webp'
const Home = () => {
  return (
    <div className='container'>

      <div className="home">
        <Banner  img={banner3} mobImg={banner3Mob} />
        <CollectionsList />
      </div>

      
    </div>
    
  )
}

export default Home