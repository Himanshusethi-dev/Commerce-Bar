import React, { useState, useEffect } from 'react'
import Price from '../../price/Price'
import "./productInfo.css"
import { createCustomer } from '../../../Services/api'
import VariantSelector from '../../../components/variantSelector/VariantSelector';
import QuantitySelector from '../../../components/quantitySelector/QuantitySelector';
import {createMarkup} from '../../../helpers.js'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../../../Services/api';
import { fetchCartThunk } from '../../../store/slices/cartSlice.js';
const ProductInfo = ({ data, vID, updateVariantID }) => {
    const  dispatch  = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [cartLines,setCartLines]  = useState([]);
    const getQuantity = (qty) => {
        setCurrentQuantity(qty)
    }

   
    const addProductToCart =  async () => {
        const  cartLineObject = {
            "merchandiseId": `gid://shopify/ProductVariant/${vID}`,
            "quantity": currentQuantity
        }
        const resp = await addToCart(cart.cartId,cartLineObject)
            dispatch(fetchCartThunk(cart.cartId))
       
    }

    useEffect(()=>{
        console.log(cartLines)
    },[cartLines])

    useEffect(()=>{

        console.log("vod",vID)
    },[vID])

    // const createCustomerTrigger = async () => {
    //     const data = await createCustomer();
    // }

    return (
        <>
            <div className="productInfo">
                <div className="prodVendor">
                    {data.vendor}
                </div>
                <div className="productTitle">
                    {data.title}
                </div>
                <Price data={data} vID={vID} />

                {
                    data.totalInventory > 0 ? (
                        <div>{data.totalInventory} left</div>
                    ) : 
                    <div className="outOfStockLabel">
                        Sold out
                    </div>
                }
               
                <VariantSelector data={data} vID={vID}  updateVariantID={updateVariantID} />
                <QuantitySelector getQuantity={getQuantity} />

                <div className="productFormButtons" >
                    <button    disabled={`${data?.totalInventory > 0 ? "" : "true" }`}   className="atcButton" onClick={() => { addProductToCart() }}>
                        Add to Cart
                    </button>
                </div>
                {
                    data.descriptionHtml && (

                        <>

                        <div className="productDescription">
                        <div className="contentTitle">
                                Description
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(data.descriptionHtml)} className='productDescriptionContent'></div>
                        </div>
                           

                        </>
                    )
                }



            </div>

        </>
    )
}

export default ProductInfo