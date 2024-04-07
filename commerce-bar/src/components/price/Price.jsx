import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams  } from 'react-router-dom'

const Price = ({ data, vID }) => {
    const [priceState, setPriceState] = useState({})
    const [currentVariant, setCurrentVariant] = useState(vID)
    const [searchParams,setSearchParams ]  = useSearchParams();


    const getPrice = () => {
        let priceObj = {};
        data.variants.edges.forEach((item) => {
            if (item.node.id.includes(currentVariant)) {
                priceObj.price = item.node.price.amount,
                    priceObj.compareAtPrice = item.node.compareAtPrice.amount
            }
            setPriceState(priceObj)
            return priceObj;
        });
    }


    
    useEffect(()=>{
        setCurrentVariant(searchParams.get('variant'))
    },[searchParams])
    
    useEffect(() => {
        getPrice()
        console.log(priceState)
        console.log(currentVariant,"currentVariant")
    }, [currentVariant])

    useEffect(() => {
        console.log(priceState)
    }, [priceState])

    return (
        <>
            {
                !!data && (

                    <div className="priceContainer">
                        <span className='price'>
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