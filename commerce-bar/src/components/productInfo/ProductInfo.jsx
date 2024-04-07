import React from 'react'
import Price from '../price/Price'
import "./productInfo.css"
import VariantSelector from '../variantSelector/VariantSelector'
import QuantitySelector from '../quantitySelector/QuantitySelector'

const ProductInfo = ({data,vID}) => {
    return (
        <>
            <div className="productInfo">
                <div className="prodVendor">
                    {data.vendor}
                </div>
                <div className="productTitle">
                    {data.title}
                </div>
                <Price data = {data} vID={vID} />

                <VariantSelector  data = {data}  vID={vID} />
                <QuantitySelector  />
                
            </div>

        </>
    )
}

export default ProductInfo