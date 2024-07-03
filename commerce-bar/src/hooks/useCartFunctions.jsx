import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { createCartThunk, updateBuyerIDThunk, fetchCartThunk } from "../store/slices/cartSlice"
const useCartFunctions = () => {
    const dispatch = useDispatch();
    const { cartId, cartBuyer } = useSelector((state) => state.cart)
    const { authToken } = useSelector((state) => state.authProvider)
    useEffect(() => {
        cartInitialCreation()
    }, [])

    useEffect(() => {
        if (authToken && cartId && !cartBuyer) {
            connectCartToCustomer()
        }
    }, [authToken])

    useEffect(() => {

        dispatch(fetchCartThunk(cartId))
    }, [cartId, cartBuyer])

    const cartInitialCreation = async () => {
        try {
            if (cartId) {
                // alert('Cart already created')
                return;
            } else {
                const resp = dispatch(createCartThunk({

                    "note": "<your-note>"
                }))
                // console.log(resp)
            }
        } catch (error) {
        }
    }

    const connectCartToCustomer = () => {
        const resp = dispatch(updateBuyerIDThunk(
            {
                buyerIdentity: {
                    "customerAccessToken": authToken
                },
                cartId: cartId
            }
        ))

        // console.log("Connecting cart to the customer")
        // console.log(resp)
    }

    return (
        {}
    )
}

export default useCartFunctions