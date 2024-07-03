import React, { Fragment } from 'react'
import "./cart.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartByID } from '../../Services/api'
import { fetchCartThunk } from '../../store/slices/cartSlice'
import CartLineItem from '../../components/cart/CartLineItem'
import Modal from '../../components/modal/Modal'
const Cart = () => {
  const dispatch = useDispatch();
  const { cartId, cartBuyer, cartData } = useSelector((state) => state.cart)
  const [cartItems, setCartItems] = useState([]);
  // const[cartData,setCartData] = useState(null);
  useEffect(() => {

    const cartDataItems = cartData?.lines?.edges;

    setCartItems(cartDataItems);

  }, [cartData])

  useEffect(() => {

    // getCartByID(cartId)

    // console.log(cartItems)
  }, [cartItems])
  return (

    <div className="cartPage container">
      <div className="cartItems">
        {
          cartItems?.map((item) => {
            return <Fragment key={item.node.merchandise.id}>
              <CartLineItem cartId={cartId} lineItem={item.node} />
            </Fragment>
          })
        }

      </div>

      <div className="cartRightPanel">
        <div className="cartOrdersPanel">
          <div className="cartOrderHeading">
            Order Summary
          </div>
          <div className="totalItems">
          Number Of Items : <span> {cartData.totalQuantity} Items  </span>
          </div>
          <div className="totalPrice">
          Total Amount : <span>  &#8377; { Math.ceil(cartData.cost?.totalAmount.amount)} </span>
          </div>

          {/* <Link to={`${cartData.checkoutUrl}`} >Checkout </Link> */}
        </div>
      </div>


    </div>
  )
}

export default Cart