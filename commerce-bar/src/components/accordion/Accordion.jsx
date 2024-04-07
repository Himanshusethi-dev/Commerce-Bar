import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState, useRef } from 'react'
import './accordion.css'

const Accordion = ({fl,minPriceValue,maxPriceValue,priceRangeQuery,filterOperation,initPriceRange}) => {

  const [show,setShow] = useState(false)

//   const currentFilters = JSON.parse(localStorage.getItem("allFiltersData"))
  // const  handleFilterAccordion = ()=>{

  // }

//   useEffect(()=>{

// console.log(currentFilters)
//   },[currentFilters])

  return (
    

    <div className="filterItem acc" >

    <div className="filterLabel">
       <button className='filterLabelButton' onClick={(e)=>{setShow(!show)}}>
            <span>
                    {fl.label}
            </span>
            <span>
                <RiArrowDropDownLine />
            </span>
       </button>
    </div>
{
  
}
    <div className={`filterBox ${show ? "show" : ""}`}>

        {
            fl.values.map((val, valIndex) => (
                fl.type === 'LIST' ? (
                    <div className="filterInput" key={valIndex}>
                        <span className="filterInputLabel">

                            <label htmlFor={`filterSelector-${val.label}`}>
                                {val.label}
                            </label>
                        </span>
                        <span className="filterInputField">
                            <input type="checkbox"  name={`filterItem-${val.label}`} id={`filterSelector-${val.label}`} onChange={(e) => filterOperation(e, val.input, val.label)} />
                        </span>
                    </div>
                ) : (

                    <div className="priceFilter" key={valIndex}>
                        <span className="filterInputLabel">
                        
                            <div className="inputRange">
                            
                                <div className='inputRangeContainer'>
                                    <div className="minMaxValueContainer">
                                        <div className="minPriceVal">
                                        <span>Rs.</span>
                                        <span>
                                            <input type="number" name="priceMin" value={minPriceValue} onChange={(e)=>{initPriceRange(e.target.name,e.target.value)}} onBlur={(e)=>{priceRangeQuery(minPriceValue,maxPriceValue)}} id="priceMinimum" />
                                        </span>
                                        </div>
                                        <div className="maxPriceVal">
                                            <span>Rs.</span>
                                            <span>
                                                <input type="number" name="priceMax" value={maxPriceValue} onChange={(e)=>{initPriceRange(e.target.name,e.target.value)}} onBlur={(e)=>{priceRangeQuery(minPriceValue,maxPriceValue)}} id="priceMaximum" />
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>

                )

            ))
        }


    </div>



</div>




  )
}

export default Accordion