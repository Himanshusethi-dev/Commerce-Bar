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
    // const getCustomerData = async () => {
    //     if (authToken) {
    //         try {
    //             const resp = await fetchCustomer(authToken);
    //             console.log("customerData", resp.data.data.customer)
    //             setIsCustomer(true)
    //             setCustomerData(resp.data.data.customer)
    //         } catch (error) {
    //             console.log(error)
    //             setIsCustomer(false)
    //         }
    //     }else{
    //         alert('Please log in')
    //     }

    // }
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