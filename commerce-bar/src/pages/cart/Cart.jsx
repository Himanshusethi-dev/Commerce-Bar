import React, { Fragment } from 'react'
import "./cart.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartByID } from '../../Services/api'
import { fetchCartThunk } from '../../store/slices/cartSlice'
import CartLineItem from '../../components/cart/CartLineItem'
import Modal from '../../components/modal/Modal'
const Cart = () => {
  const dispatch = useDispatch();
  const { cartId, cartBuyer, cartData } = useSelector((state) => state.cart)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const cartDataItems = cartData.lines.edges;

    setCartItems(cartDataItems);

  }, [cartData])

  useEffect(() => {

    // getCartByID(cartId)

    console.log(cartItems)
  }, [cartItems])
  return (


    <div className="cartPage container">
      <div className="cartItems">


        {

          cartItems.map((item) => {



            return <Fragment key={item.node.merchandise.id}>

              <CartLineItem lineItem={item.node} />
             

            </Fragment>


          })
        }

     
      </div>


    </div>
  )
}

export default Cart