import React, { Fragment } from 'react'
import { useEffect, useState, useRef } from 'react'
import './mainFilters.css'
import { RiArrowDropDownLine } from "react-icons/ri";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles

const MainFilters = ({ data, getAllSelectedFilters }) => {

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [minPriceValue,setMinPriceValue] = useState(30)
    const [maxPriceValue,setMaxPriceValue] = useState(800)


    // useEffect(() => {
    //     (data.products.filters.map((filter) => {

    //         // console.log(filter.label)
    //     }))

    // }, [data])

    // const refElementMin = useRef(0)
    // const refElementMax = useRef(0)

    const handleSliderChange = (value) => {
        setMinPriceValue(value[0])
        setMaxPriceValue(value[1])
    };

    const filterOperation = (elem, input, label) => {

        let validArr = selectedFilters;
        const filterValue = JSON.parse(input)
        let toAdd = true;
        validArr.forEach((filter, index, arr) => {
            if (JSON.stringify(filter).includes(input)) {
                // console.log(true,index,arr)
                arr.splice(index, 1)
                // console.log(arr)
                toAdd = false;
            }
        })


        if (toAdd) {
            validArr.push(filterValue);
        }

        // console.log(validArr)

        setSelectedFilters((prevArray) => [...validArr])
    }

    const filterCall = () => {

        getAllSelectedFilters(selectedFilters)
    }

    useEffect(() => {
        console.log(selectedFilters)
    }, [selectedFilters])


    return (

        <>
            <div>Filter: </div>

            <div className="filterGroup">
                {

                    data?.products?.filters?.map((fl) => (

                        <Fragment key={fl.id}>

                            <div className="filterItem" >

                                <div className="filterLabel">
                                    <span>
                                        {fl.label}
                                    </span>
                                    <span>
                                        <RiArrowDropDownLine />
                                    </span>
                                </div>

                                <div className="filterBox">

                                    {
                                        fl.values.map((val, valIndex) => (
                                            fl.type === 'LIST' ? (
                                                <div className="filterInput" key={valIndex}>
                                                    <span className="filterInputLabel">

                                                        <label htmlFor="filterSelector">
                                                            {val.label}
                                                        </label>
                                                    </span>
                                                    <span className="filterInputField">
                                                        <input type="checkbox" name={`filterItem-${val.label}`} id="filterSelector" onChange={(e) => filterOperation(e, val.input, val.label)} />
                                                    </span>
                                                </div>
                                            ) : (

                                                <div className="priceFilter" key={valIndex}>
                                                    <span className="filterInputLabel">

                                                        <div className="inputRange">
                                                              <label htmlFor={'priceRange'} >Range Slider</label>

                                                            <div className='inputRangeContainer'>
                                                                <div className="minPriceVal">
                                                                    {minPriceValue}
                                                                </div>
                                                                <Slider
                                                                    min={0}
                                                                    max={1000}
                                                                    step={1}
                                                                    name={'priceRange'}
                                                                    range={true}
                                                                    defaultValue={[30, 800]}
                                                                    onChange={handleSliderChange}
                                                                />
                                                                 <div  className="maxPriceVal">
                                                                    {maxPriceValue}
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


                        </Fragment>

                    ))

                }


            </div >


            <button type="button" onClick={filterCall}>Apply</button>


        </>


    )
}

export default MainFilters