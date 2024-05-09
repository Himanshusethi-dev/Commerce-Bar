import React, { useState, useEffect, Fragment } from 'react'
import "./productPage.css";
import { json, useParams,useSearchParams  } from 'react-router-dom'
import { getProductByHandle } from '../../Services/api';
import ProductInfo from '../../components/productLibrary/productInfo/ProductInfo';
import MediaSlider from '../../components/productLibrary/productMedia/MediaSlider';
import ProductsGrid from '../../components/productLibrary/productsGrid/ProductsGrid';
const ProductPage = () => {

    const params = new useParams();
    const { handle } = params;
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
        // console.log("firstSelectedVariantId",firstSelectedVariantId)
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

    return (
        <>
            {
                !!prodData && (
                    <Fragment>
                       
                      <div className="productPage container">
                             <div className="productMain">
                                <MediaSlider  data={prodData} vID = {variantId} showThumbNails={true} />
                                <ProductInfo  data={prodData} vID = {variantId} updateVariantID={updateVariantID} />
                            </div>
                            <ProductsGrid vID = {variantId}  data={prodData} type={'Related Products'} /> 
                      </div>
                      

                    </Fragment>

                )
            }
        </>
    )
}

export default ProductPage