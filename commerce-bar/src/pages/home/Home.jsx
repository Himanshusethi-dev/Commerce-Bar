import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>

      <div className="home">
        Home
      </div>

      <div className="nav">
        <Link to={'/collections-list'}>  Collections </Link>
        <Link to={'/account/sign-up'} > Sign up</Link>
      </div>
    </div>
    
  )
}

export default Home