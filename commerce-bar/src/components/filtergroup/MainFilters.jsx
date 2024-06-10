import React, { Fragment } from 'react'
import { useEffect, useState, useRef } from 'react'
import './mainFilters.css'
import { RiArrowDropDownLine } from "react-icons/ri";
import Accordion from '../accordion/Accordion';

const MainFilters = ({ data, getAllSelectedFilters }) => {

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedPriceValues, setSelectedPriceValues] = useState([]);
    const [minPriceValue, setMinPriceValue] = useState(0)
    const [maxPriceValue, setMaxPriceValue] = useState(0)

    useEffect(() => {
        (data.products.filters.map((filter) => {
            if (filter.label === 'Price') {
                filter.values.forEach(value => {
                    let priceSettor = JSON.parse(value.input)
                    setMinPriceValue(priceSettor.price.min)
                    setMaxPriceValue(priceSettor.price.max)
                });
            }
        }))

    }, [data])

    const priceRangeQuery = (min, max) => {
        let priceQuery = { price: { min: Number(min), max: Number(max) } }
        filterOperation(null, JSON.stringify(priceQuery))
    }


    const removeFilter = (selectedFiltersList, input, toAddFilter, filterValue) => {
        selectedFiltersList.forEach((filter, index, arr) => {
            if ('price' in filter && 'price' in filterValue) {
                selectedFiltersList.splice(index, 1)
            }
            if (JSON.stringify(filter).includes(input)) {
                arr.splice(index, 1)
                toAddFilter = false;
            }
        })

        return toAddFilter;

    }


    const filterOperation = (elem, input, label) => {
        let validArr = selectedFilters;
        const filterValue = JSON.parse(input);
        let toAddFilter = true;
        console.log(validArr)
        toAddFilter = removeFilter(validArr, input, toAddFilter, filterValue)
        if (toAddFilter) {
            validArr.push(filterValue);
        }
        setSelectedFilters((prevArray) => [...validArr])
    }

    const initPriceRange = (name, value) => {

        if (name === 'priceMin') {
            setMinPriceValue(value)
        }

        if (name === 'priceMax') {
            setMaxPriceValue(value)
        }

    }

    const filterCall = () => {
        getAllSelectedFilters(selectedFilters)
    }

    return (

        <>


            {

                data.products.filters.length >= 1 &&

                (
                    <>


                        <div>Filter: </div>
                        <div className="filterInner">


                            <div className="filterGroup">
                                {

                                    data?.products?.filters?.map((fl) => (

                                        <Fragment key={fl.id}>


                                            <Accordion

                                                fl={fl}
                                                minPriceValue={minPriceValue}
                                                maxPriceValue={maxPriceValue}
                                                priceRangeQuery={priceRangeQuery}
                                                filterOperation={filterOperation}
                                                initPriceRange={initPriceRange}
                                            />



                                        </Fragment>
                                    ))

                                }


                            </div >


                            <div>
                                <button className='applyFilterButton' type="button" onClick={filterCall}>Apply</button>
                            </div>



                        </div>

                    </>
                )
            }


        </>


    )
}

export default MainFilters