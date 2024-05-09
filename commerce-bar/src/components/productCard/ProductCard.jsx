import React, { useEffect, useState } from 'react'
import placeholderImage from '../../assets/placeholderImage.png'
import { useNavigate } from 'react-router-dom'
import "./productCard.css"
const ProductCard = ({ item, data, index }) => {

    const [productDiscount, setProductDiscount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        calculateDiscount()
    }, [])


    const calculateDiscount = () => {
        let productDiscount = 0;
        item?.variants?.edges.forEach(variant => {
            const variantDiscount = Number(variant.node.compareAtPrice.amount).toFixed(0) - Number(variant.node.price.amount).toFixed(0);
            if (productDiscount < variantDiscount) {
                productDiscount = variantDiscount
            }
        });
        setProductDiscount(productDiscount)
    }

    const navigateHandle = (handle, idString) => {
        navigate(`/products/${handle}`)
    }

    return (
        <div className="ProductCard" >

            <div className="productImage" onClick={() => { navigateHandle(`${item.handle}`) }} >
                {
                    item.images?.edges.length > 0 ? (

                        <img width='150' src={`${item.images?.edges[0].node.url}`} alt="" />
                    ) : (
                        <img width='150' src={placeholderImage} alt="" />

                    )
                }

            </div>

            <div className="productCardInfo">
                <div className="prodVendorTitle">
                    {data.title || item.vendor}
                </div>

                <div className="productTitle">
                    {item.title}
                </div>



                {
                    productDiscount > 0 && (

                        <div className="productDiscount">
                            Up to Rs. {productDiscount} OFF
                        </div>
                    )
                }


                {
                    Number(item.priceRange.minVariantPrice.amount) !== Number(item.priceRange.maxVariantPrice.amount) ? (
                        <div className="priceRange">
                            <span> Rs. {Number(item.priceRange.minVariantPrice.amount).toFixed(0)}</span> - <span>Rs. {Number(item.priceRange.maxVariantPrice.amount).toFixed(0)}  </span>
                        </div>


                    ) :
                        (
                            <div className="price">
                                Rs. {Number(item.priceRange.maxVariantPrice.amount).toFixed(0)}
                            </div>
                        )



                }


            </div>


        </div>
    )
}

export default ProductCard