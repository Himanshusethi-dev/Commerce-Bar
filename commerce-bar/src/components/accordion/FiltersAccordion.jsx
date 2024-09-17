import React, { Fragment, useEffect, useState,useReducer } from 'react'
import { json } from 'react-router-dom'
import ProductRangeSlider from '../sliders/rangeSlider/RangeSlider'
import { filtersReducer } from '../../reducers/filtersReducer'



const FiltersAccordion = ({ data, type,addToFilters,removeFromFilters,addOrUpdatePriceFilters }) => {

    const [show, setShow] = useState(false)

    // useEffect(() => {
    //     console.log('rr', type)
    // }, [type])

    const manageFilters = (e,label)=>{
        if(e.target.checked){
             addToFilters(JSON.parse(e.target.value),label);
            // console.log(e.target.value,label)
        }else{
            removeFromFilters(label)
            console.log("removed")
        }
    }

    const managePriceFilter = (label,input)=>{

        // console.log("pricer",input)
        addOrUpdatePriceFilters(label,input)

    }


    return (
        <div className='filterItem'>
            <div className="filterLabel">
                {data.label}
            </div>
            <div className="filterValue">


                {

                    data && type && (
                        data?.values.map(({ label, count, input }, i) => (

                            <Fragment key={i}>
                                {
                                    data.type == type?.list ? (
                                        <div className="filterValue">
                                            <input id={`filter-${label}`} type="checkbox" name={`filter-product-${label}`} value={input} onClick={(e)=>{manageFilters(e,label)}} />
                                            <label htmlFor={`filter-${label}`} >{label}</label>
                                        </div>

                                    )
                                        : data.type === type.price_range ? (

                                            <div>
                                             <ProductRangeSlider data={input}  managePriceFilter={managePriceFilter}  />
                                            </div>
                                        ) :
                                        (
                                            "fgf"
                                        )
                                }

                            </Fragment>




                        ))
                    )

                }
            </div>
        </div>
    )
}

export default FiltersAccordion