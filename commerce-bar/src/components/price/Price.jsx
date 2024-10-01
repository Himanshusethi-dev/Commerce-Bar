import React from 'react'
import { useState, useEffect } from 'react'

const Price = ({ data, vID }) => {
    const [priceState, setPriceState] = useState({})
    const getPrice = () => {
        let priceObj = {};
        data.variants.edges.forEach((item) => {
            if (item.node.id.includes(vID)) {
                priceObj.price = item.node.price.amount,
                    priceObj.compareAtPrice = item.node.compareAtPrice.amount
            }
            setPriceState(priceObj)
            return priceObj;
        });
    }

    useEffect(() => {
        getPrice()
    }, [vID])

    return (
        <>
            {
                !!data && (

                    <div className="priceContainer">
                        <span className='priceValue'>
                            ₹ {priceState.price}
                        </span>
                        {
                            !!(priceState.compareAtPrice > priceState.price) && (
                                <span className="comparePrice">
                                    ₹{priceState.compareAtPrice}
                                </span>
                            )
                        }
                        <span className="discount">
                            {/* { Math. } */}
                        </span>
                    </div>
                )
            }
        </>

    )
}

export default Price