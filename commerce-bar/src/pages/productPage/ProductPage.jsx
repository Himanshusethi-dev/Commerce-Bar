import React, { useState, useEffect, Fragment } from 'react'
import "./productPage.css";
import { json, useParams } from 'react-router-dom'
import { getProductByHandle } from '../../Services/api';

const ProductPage = () => {

    const params = new useParams();
    const { handle } = params;
    const [prodData, setProdData] = useState(null);
    useEffect(() => {
        productFetchByHandle()
    }, [handle])

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

                        <div className="productMain">

                            <div className="productMedia">
                                {prodData.images.edges.map((item) => (
                                    <div className="mediaContainer">
                                        <div className="prodimage">
                                            <img src={item.node.url} />
                                        </div>

                                    </div>
                                ))}
                            </div>
                            <div className="productInfo">
                                <div className="prodVendor">
                                    {prodData.vendor}
                                </div>
                                <div className="productTitle">
                                    {prodData.title}
                                </div>
                            </div>



                        </div>



                    </Fragment>

                )
            }
        </>
    )
}

export default ProductPage