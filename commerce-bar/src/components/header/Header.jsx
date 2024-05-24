import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

    const { authToken } = useSelector((state) => state.authProvider)

    return (
        <div className='header'>
            <nav className="nav">
                <Link to={'/collections-list'}>  Collections </Link>

                {
                    authToken ? (

                        <Link to={'/account/profile'} > Account</Link>
                    )

                        : (
                            <Link to={'/account/login'} > Login</Link>


                        )
                }
            </nav>
        </div>
    )
}

export default Header