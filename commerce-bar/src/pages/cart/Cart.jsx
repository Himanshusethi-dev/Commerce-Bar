import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import  {getCartByID}  from '../../Services/api'
import {fetchCartThunk} from '../../store/slices/cartSlice'
const Cart = () => {
  const dispatch = useDispatch();
  // const { cartId,cartBuyer } = useSelector((state) => state.cart)

  // useEffect(()=>{

  //   // getCartByID(cartId)

  //   dispatch(fetchCartThunk(cartId))
  // },[cartId,cartBuyer])
  return (
    <div>cart</div>
  )
}

export default Cart