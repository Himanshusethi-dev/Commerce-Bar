import React from 'react'
import "./selectorButtons.css"
const SelectorButtons = ({ quantityLimitArr,selectedQuantity }) => {


    return (

        <>
            <div className="selectorButtonsContainer">
                <>
                    {
                        quantityLimitArr.map((i) => {
                            return (
                                
                                <button className={`${i === selectedQuantity ? "selected" : ""}`}    key={i}>
                                    {i}
                                 </button>
                
                            )
                        }
                        )
                    }
                </>
            </div>

           
        </>




    )
}

export default SelectorButtons