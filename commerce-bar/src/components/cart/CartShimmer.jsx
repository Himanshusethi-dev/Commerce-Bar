import React, { Fragment } from 'react'
import "./cartShimmer.css"
const CartShimmer = ({side}) => {
    return (
        <>


            {

                side === 'left' ? (

                    Array.from({ length: 3 }).map((item,i) => (
                        <Fragment key={i}>
    
                        <div className="cartShimmerItem" >
                        
                             <div className="cartItemBody cartShimmerBody">
                                <div className="cartItemMedia cartShimmerMedia">
                                </div>
                                <div className="cartItemInfo cartShimmerInfo">
                                  <div className="infoContent cartShimmerInfoContent"> </div>
                                  <div className="infoContent cartShimmerInfoContent"> </div>
                                </div>
                             </div>
                        </div>
    
                           
                        </Fragment>
                    ))
                )

                :

                (

                    <div className="cartRightPanel cartShimmerItemRightPanel"></div>
                )
               
            }


        </>
    )
}

export default CartShimmer