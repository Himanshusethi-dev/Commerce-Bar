import React, { Fragment } from 'react'
import "./variantSelector.css"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'


const VariantSelector = ({ data, vID }) => {

    const [currentVariant, setCurrentVariant] = useState(vID)
    const [searchParams, setSearchParams] = useSearchParams();

    const onVariantChange = (idString) => {

        // console.log("id",idString)
        let idArray = idString.split('/')
        let varID = idArray[idArray.length - 1]

        setCurrentVariant(varID)
        setSearchParams({variant:varID})

        console.log("varID", varID)

    }

    return (

        <>
            {
                !!data && (
                    <div className="variantSelector">
                        {(!!data.variants.edges.length > 0) && (

                            <>

                                <div className="optionCategory">
                                    Size : 
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

                                                {/* <div className="cvID">
                                                    {currentVariant}
                                                </div> */}
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            </>
                        )}
                    </div>

                )
            }

        </>

    )
}

export default VariantSelector