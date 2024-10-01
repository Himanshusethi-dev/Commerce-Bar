import React, { useEffect } from 'react'
import "./header.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import logo from '../../assets/stRETch.png'

import NavigationMenu from './NavigationMenu'

const Header = () => {

    const { authToken } = useSelector((state) => state.authProvider)
    const { totalQuantity } = useSelector((state)=>state.cart?.cartData)
    const navigate = useNavigate();
    return (
        <div className='header'>
            <div className="headerBox container">

                <div className="headerLogo" onClick={()=>{navigate('/')}}>
                    <img   src={logo} alt="" />
                    <span>Femyty</span>
                </div>

                <ul className="headerActions">
                    <li className="headerItem accountTile">

                        {

                            authToken ? (
                               
                                    <Link to={'/account/profile'} > <span className='headerIcon'><VscAccount /></span> <span className='headerTileValue'>Account</span>  </Link>
                               
                            )
                                : (
                                    
                                        <Link to={'/account/login'} > <span className='headerIcon'><VscAccount /></span> <span className='headerTileValue'>Login</span> </Link>
                                  
                                )
                        }


                    </li>
                    <li className="headerItem cartTile">
                        <Link to={'/cart'}> <span className='headerIcon'>  <FaShoppingCart /> <span className='quantityBadge'> {totalQuantity} </span></span>  <span className='headerTileValue'>Bag</span>  </Link>
                    </li>
                </ul>

            </div>
            <NavigationMenu />
        </div>
    )
}

export default Header