import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { getCollectionByHandle } from '../../Services/api'
import { useParams } from 'react-router-dom'
import placeholderImage from '../../assets/placeholderImage.png'
import ProductCard from '../../components/productCard/ProductCard'
import Filter from '../../components/filter/Filter'
import MainFilters from '../../components/filtergroup/MainFilters'
const ProductList = () => {


    const [sortOrder, setSortOrder] = useState(false);
    const [sortvalue, setSortValue] = useState('MANUAL');
    const [data, setData] = useState(null)

    const params = new useParams();

    const { handle } = params;

    const getSortParams = (sortArg) => {
        const sortArgObj = JSON.parse(sortArg)
        setSortValue(sortArgObj.sort)
        setSortOrder(sortArgObj.reverse)
    }

    useEffect(() => {

        getAllProducts()

    }, [sortvalue, sortOrder])

    const getAllProducts = async () => {

        const resp = await getCollectionByHandle(JSON.stringify(handle), sortvalue, sortOrder);
        console.log(resp)
        setData(resp)
    }


    return (

        <>
            {!!data && (


                <div>

                    <div className="collectionInfo">


                        <div className="collectionContent">
                            <div className="collTitle">
                                {data.title}
                            </div>
                            <div>{data.description}</div>
                        </div>
                        <div className="collectionMedia">
                            <div className="collectionImage">
                                <img src={`${data.image.url}`} alt="" />
                            </div>
                        </div>
                    </div>



                    <div className="plpSortBy">
                        <Filter data={data} getSortParams={getSortParams} />
                    </div> 


                    <div className="mainFilters">
                         <MainFilters  data={data}  />
                    </div>

                    



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

                                                <ProductCard data={data} item={item} key={index} />


                                            ))
                                        }

                                    </div>
                                </>


                            )

                        }

                    </div>




                </div>


            )
            }
        </>


    )
}

export default ProductList
