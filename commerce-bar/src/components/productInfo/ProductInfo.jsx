import React, { useState, useEffect } from 'react'
import Price from '../price/Price'
import "./productInfo.css"
import VariantSelector from '../variantSelector/VariantSelector'
import QuantitySelector from '../quantitySelector/QuantitySelector'
import { createCustomer } from '../../Services/api'

const ProductInfo = ({ data, vID, updateVariantID }) => {
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const getQuantity = (qty) => {
        setCurrentQuantity(qty)
    }

    function createMarkup(c) {
        return { __html: c };
    }
    const addProductToCart = () => {
    }

    // useEffect(() => {
    //     console.log("currentQuantity", currentQuantity)
    // }, [currentQuantity])

    const createCustomerTrigger = async () => {

        const data = await createCustomer();
        console.log(data)
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
                    data.totalInventory > 0 ? (
                        <div>{data.totalInventory} left</div>
                    ) : 
                    <div className="outOfStockLabel">
                        Sold out
                    </div>
                }
               
                <VariantSelector data={data} vID={vID} updateVariantID={updateVariantID} />
                <QuantitySelector getQuantity={getQuantity} />

                <div className="productFormButtons" >

                    <button className="atcButton" onClick={() => { addProductToCart(currentQuantity) }}>
                        Add to Cart
                    </button>


                    {/* <button className="signup"  onClick={createCustomerTrigger}>
                        SIGN UP
                     </button> */}

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