import React, { useEffect } from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavigationMenu from './NavigationMenu'

const Header = () => {

    const { authToken } = useSelector((state) => state.authProvider)

    return (
        <div className='header'>
            <div className="headerBox container">      
                <Link to={'/collections-list'}>  Collections </Link>
                {
                    authToken ? (
                        <Link to={'/account/profile'} > Account</Link>
                    )
                        : (
                            <Link to={'/account/login'} > Login</Link>
                        )
                }
                <Link to={'/cart'}>  Cart </Link>

            </div>
            <NavigationMenu  />
        </div>
    )
}

export default Header