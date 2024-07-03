import React, { useState, useEffect } from 'react'
import Price from '../../price/Price'
import "./productInfo.css"
import { createCustomer } from '../../../Services/api'
import VariantSelector from '../../../components/variantSelector/VariantSelector';
import QuantitySelector from '../../../components/quantitySelector/QuantitySelector';
import { createMarkup } from '../../../helpers.js'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../Services/api';
import { useNavigate } from 'react-router-dom';
import { fetchCartThunk } from '../../../store/slices/cartSlice.js';
import { SpinningCircles } from 'react-loading-icons'
import Loader from '../../loader/Loader.jsx';
const ProductInfo = ({ data, vID, updateVariantID }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [cartLines, setCartLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const getQuantity = (qty) => {
        setCurrentQuantity(qty)
    }


    const addProductToCart = async () => {
        const cartLineObject = {
            "merchandiseId": `gid://shopify/ProductVariant/${vID}`,
            "quantity": currentQuantity
        }
        setLoading(true)
        const resp = await addToCart(cart.cartId, cartLineObject)
        dispatch(fetchCartThunk(cart.cartId))
        setLoading(false)
        navigate(`/cart`)
        console.log("Resp", resp)

    }

    useEffect(() => {
        console.log(cartLines)
        console.log(createMarkup(data.descriptionHtml))
    }, [cartLines])

    useEffect(() => {

        console.log("vod", vID)
    }, [vID])

    // const createCustomerTrigger = async () => {
    //     const data = await createCustomer();
    // }

    if (loading) {
        return <div>
            <Loader>
                <div className='loaderContainer'>
                    <SpinningCircles stroke='#000' speed ="1" fill="#000" />
                </div>
            </Loader>
        </div>
    } 


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
                        data.totalInventory > 0 && data.totalInventory < 20 ? (
                            <div>{data.totalInventory} left</div>
                        ) :

                            data.totalInventory == 0
                                ?
                                <div className="outOfStockLabel">
                                    Sold out
                                </div>
                                :
                                ""
                    }

                    <VariantSelector data={data} vID={vID} updateVariantID={updateVariantID} />
                    <QuantitySelector getQuantity={getQuantity} />

                    <div className="productFormButtons" >
                        <button disabled={`${data?.totalInventory > 0 ? "" : "true"}`} className="atcButton" onClick={() => { addProductToCart() }}>
                            Add to Cart
                        </button>
                    </div>
                    {
                        (data.descriptionHtml && data.descriptionHtml !== "<!---->") && (

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