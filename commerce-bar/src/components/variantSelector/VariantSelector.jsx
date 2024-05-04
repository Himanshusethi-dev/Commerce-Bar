import React, { Fragment } from 'react'
import "./variantSelector.css"
import { useState, useEffect } from 'react'

const VariantSelector = ({ data, vID, updateVariantID }) => {
    const onVariantChange = (idString) => {
        let idArray = idString.split('/')
        let varID = idArray[idArray.length - 1]
        updateVariantID(varID)
    }

    return (

        <>
            {
                (!!data && data.variants.edges.length > 1) && (
                    <div className="variantSelector">
                            <>
                                <div className="optionCategory">
                                    Variant
                                </div>
                                <div className='variantsBox'>
                                    {
                                        data.variants.edges.map((item) => (
                                            <Fragment key={item.node.id}>

                                                <div className='variantTile'>
                                                    {
                                                        <button key={item.node.title} className='variantTileValue' onClick={() => { onVariantChange(item.node.id) }}>
                                                            {item.node.title}
                                                        </button>
                                                    }
                                                </div>
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </>
                    </div>
                )
            }

        </>

    )
}

export default VariantSelector