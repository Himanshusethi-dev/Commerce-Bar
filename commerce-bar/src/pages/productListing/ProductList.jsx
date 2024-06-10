import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { getCollectionByHandle } from '../../Services/api'
import { useParams } from 'react-router-dom'
import placeholderImage from '../../assets/placeholderImage.png'
import "./productList.css"
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'
import MainFilters from '../../components/filtergroup/MainFilters'
import { createMarkup } from '../../helpers.js'

const ProductList = () => {
    // const savedFiltstring = localStorage.getItem("allFilters")
    // const savedFilt = JSON.parse(savedFiltstring)
    // console.log(savedFilt)
    const [sortOrder, setSortOrder] = useState(false);
    const [sortvalue, setSortValue] = useState('MANUAL');
    const [allFilters, setAllFilters] = useState([])
    const [data, setData] = useState(null)
    const params = new useParams();
    const { handle } = params;
    const getSortParams = (sortArg) => {
        const sortArgObj = JSON.parse(sortArg)
        setSortValue(sortArgObj.sort)
        setSortOrder(sortArgObj.reverse)
    }

    const getAllSelectedFilters = (selectedFilters) => {
        setAllFilters(selectedFilters)
    }

    useEffect(() => {
        console.log(allFilters)
    }, [allFilters])

    useEffect(() => {
        getAllProducts()
    }, [sortvalue, sortOrder, allFilters])

    const getAllProducts = async () => {
        let filt = [sortvalue, sortOrder, allFilters]
        // let filtObject = 
        // {
        //     sortvalue,
        //     sortOrder,
        //     allFilters
        // }

        const resp = await getCollectionByHandle(JSON.stringify(handle), ...filt);
        console.log(resp)
        setData(resp)
        // localStorage.setItem('allFilters',JSON.stringify(filt))
    }

    return (
        <>
            {!!data && (
                <div className='container'>
                    <div className="collectionInfo">
                        <div className="collectionContent">
                            <div className="collTitle">
                                {data.title}
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(data.descriptionHtml)} className='collDescription'></div>
                        </div>
                        <div className="collectionMedia">
                            <div className="collectionImage">
                                <img src={`${data.image.url}`} alt="" />
                            </div>
                        </div>
                    </div>

                    {

                        data.products.filters.length >= 1 && (

                            <div className="plpSortBy">
                                <Filter data={data} getSortParams={getSortParams} />
                            </div>
                        )
                    }


                    <div className="productsListGroup">

                        {
                            data.products.edges.length >= 1 && (

                                <div className="mainFilters">
                                    <MainFilters getAllSelectedFilters={getAllSelectedFilters} data={data} />
                                </div>
                            )
                        }

                        <div className="collectionProductList">
                            {
                                !!data?.products?.edges?.length > 0 && (
                                    <>
                                        <div className="totalProducts">
                                            {data?.products?.edges?.length} Products
                                        </div>
                                        <div className="productGrid">
                                            {
                                                data.products?.edges.map((item, index) => (
                                                    <ProductCard data={data} item={item.node} key={index} />
                                                ))
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProductList
