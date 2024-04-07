import React, { useState, useEffect, Fragment } from 'react'
import "./productPage.css";
import { json, useParams,useSearchParams  } from 'react-router-dom'
import { getProductByHandle } from '../../Services/api';
import ProductMedia from '../../components/productMedia/ProductMedia';
import ProductInfo from '../../components/productInfo/ProductInfo';

const ProductPage = () => {

    const params = new useParams();
    const { handle } = params;
    const [searchParams,setSearchParams ]  = useSearchParams();
    const [prodData, setProdData] = useState(null);
    const [variantId,setVariantId] = useState(null)
    useEffect(() => {
        productFetchByHandle()
    }, [handle])

    useEffect(()=>{
        setVariantId(searchParams.get('variant'))
    },[searchParams])

    useEffect(()=>{
        console.log('variant',variantId)
    },[variantId])

    useEffect(() => {
        console.log(prodData)

    }, [prodData])
    const productFetchByHandle = async () => {
        const resp = await getProductByHandle(`"${handle}"`);
        //    console.log(resp)
        setProdData(resp.data.data.productByHandle)

    }
    return (

        <>

            {
                !!prodData && (
                    <Fragment>
                        <div className='productDescription'>{prodData.description}</div>
                        <div className="variantId">
                            { variantId }
                        </div>
                        <div className="productMain">
                            <ProductMedia  data={prodData} />
                            <ProductInfo  data={prodData} vID = {variantId} />
                        </div>
                    </Fragment>

                )
            }
        </>
    )
}

export default ProductPage