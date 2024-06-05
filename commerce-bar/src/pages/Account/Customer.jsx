import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/slices/authSlice';
import { fetchCustomer } from '../../Services/api';
import useCustomerData from '../../hooks/useCustomerData';

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
    const { isCustomer,customerData} =  useCustomerData();

    return (
        <>
            <div>Customer</div>
            {
                !!authToken && (

                    <button className="logOut" onClick={logOutHandler}>
                        Log out
                    </button>
                )
            }

            {
                isCustomer && (

                    <div>
                        zvcvcx

                    </div>
                )
            }

        </>

    )
}

export default Customer