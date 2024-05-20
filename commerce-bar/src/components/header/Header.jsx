import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <nav className="nav">
                <Link to={'/collections-list'}>  Collections </Link>
                <Link to={'/account/login'} > Login</Link>
            </nav>
        </div>
    )
}

export default Header