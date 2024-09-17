import React, { Fragment, useEffect, useState,useReducer } from 'react'
import { filtersReducer } from '../../reducers/filtersReducer';
import FiltersAccordion from '../accordion/FiltersAccordion'
const initialFilters = [];
const ProductsFilter = ({ data,combineFilters }) => {

    // const filterTypes = {};
    const [filterTypes,setFilterTypes] = useState({});
    
    const [filters,dispatch] = useReducer(filtersReducer,initialFilters);

    const addToFilters = (input,label)=>{

        dispatch({
            type : "add",
            input : input,
            label :label
        })
    }
    const removeFromFilters = (label)=>{

        dispatch({
            type : "remove",
            label: label
        })
    }
    const addOrUpdatePriceFilters = (label,input)=>{

        dispatch({
            type : "priceChange",
            label :label,
            input : input
        })
    }

    useEffect(()=>{
        // console.log("filtersC",filters);
        combineFilters(filters)
    },[filters]);

    useEffect(()=>{

        const filterTypesData = {};
        data?.forEach((item) => {
            filterTypesData[`${item.type}`.toLocaleLowerCase()] = item.type;
        });
       

        setFilterTypes((flTypes)=>{
            return {...flTypes,...filterTypesData};
        })
    },[data])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(()=>{
        // console.log("filterTypes",filterTypes)
    },[filterTypes])


    return (
        <div className='productsFilter'>

            <div className="filterGroup">
                {
                    

                    data?.map((filter) => (

                        <Fragment key={filter.id}>

                            <FiltersAccordion data={filter} type={filterTypes} addToFilters={addToFilters}  removeFromFilters={removeFromFilters} addOrUpdatePriceFilters={addOrUpdatePriceFilters} />

                        </Fragment>



                    ))

                }


            </div >
        </div>
    )
}

export default ProductsFilter