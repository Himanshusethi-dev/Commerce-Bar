import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/slices/authSlice';
import { fetchCustomer } from '../../Services/api';
import useCustomerData from '../../hooks/useCustomerData';
import './account.css'

const Customer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [isCustomer, setIsCustomer] = useState(false);
    // const [customerData,setCustomerData] = useState(null)
    const { authToken } = useSelector((state) => state.authProvider)
    useEffect(() => {
        !authToken && navigate(`/account/login`, { replace: true })
    }, [authToken])
    const logOutHandler = () => {
        dispatch(userLogout(authToken))

    }

    useEffect(() => {
    }, [])
    const { isCustomer, customerData } = useCustomerData();

    return (
        <div className="container">
            <div className='customerPage'>
               
                {
                    !!authToken && (

                        <button className="logOut" onClick={logOutHandler}>
                            Log out
                        </button>
                    )
                }


            </div>
        </div>

    )
}

export default Customer