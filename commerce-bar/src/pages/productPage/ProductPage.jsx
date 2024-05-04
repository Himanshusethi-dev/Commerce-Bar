import React, { useState, useEffect, Fragment } from 'react'
import "./productPage.css";
import { json, useParams,useSearchParams  } from 'react-router-dom'
import { getProductByHandle } from '../../Services/api';
import MediaSlider from '../../components/productMedia/mediaSlider';
import ProductInfo from '../../components/productInfo/ProductInfo';

const ProductPage = () => {

    const params = new useParams();
    const { handle } = params;
    // const [searchParams,setSearchParams ]  = useSearchParams();
    const [prodData, setProdData] = useState(null);
    const [variantId,setVariantId] = useState(null)

    const productFetchByHandle = async () => {

        try {
            const resp = await getProductByHandle(`${handle}`);
            setProdData(resp.data.data.productByHandle)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        productFetchByHandle()
    }, [handle])

    const getInitialVariantID = ()=>{
        if(!prodData) return;
        const idStringArray = prodData.variants.edges[0].node.id.split("/")  
        const  firstSelectedVariantId = idStringArray[idStringArray.length - 1]
        console.log("firstSelectedVariantId",firstSelectedVariantId)
        return firstSelectedVariantId
    }

    const updateVariantID =(cvid)=>{
        setVariantId(cvid)
    }

    useEffect(()=>{
      let initialVariantID =   getInitialVariantID()
        console.log(prodData,"prodData")
        setVariantId(initialVariantID)
    },[prodData])

    useEffect(()=>{
        console.log('variant',variantId)
    },[variantId])

    return (
        <>
            {
                !!prodData && (
                    <Fragment>
                       
                      
                        <div className="productMain">
                            <MediaSlider  data={prodData} showThumbNails={true} />
                            <ProductInfo  data={prodData} vID = {variantId} updateVariantID={updateVariantID} />
                        </div>
                    </Fragment>

                )
            }
        </>
    )
}

export default ProductPage