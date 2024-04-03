import React, { useEffect,useState } from 'react'
import placeholderImage from '../../assets/placeholderImage.png'
import { useNavigate } from 'react-router-dom'
import "./productCard.css"
const ProductCard = ({ item, data, index }) => {

    const [productDiscount,setProductDiscount] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        calculateDiscount()
    },[])


    const calculateDiscount = ()=>{
        let productDiscount = 0;
       item?.node?.variants?.edges.forEach(variant => {
       const variantDiscount =  Number(variant.node.compareAtPrice.amount).toFixed(0) -  Number(variant.node.price.amount).toFixed(0);
       if(productDiscount < variantDiscount){
        productDiscount = variantDiscount
       }
       });
       setProductDiscount(productDiscount)
    }

    const navigateHandle = (handle)=>{
        navigate(`/products/${handle}`)
    }

    return (
        <div className="ProductCard" >

            <div className="productImage"  onClick={()=>{navigateHandle(`${item.node.handle}`)}} >
                {
                    item.node.images?.edges.length > 0 ? (

                        <img width='200' src={`${item.node.images?.edges[0].node.url}`} alt="" />
                    ) : (
                        <img width='200' src={placeholderImage} alt="" />

                    )
                }

            </div>

            <div className="prodVendorTitle">
                {data.title}
            </div>

            <div className="productTitle">
                {item.node.title}
            </div>

            <div className="productDiscount">
               Up to Rs. {productDiscount} OFF
            </div>

            {
                Number(item.node.priceRange.minVariantPrice.amount) !== Number(item.node.priceRange.maxVariantPrice.amount) ? (
                    <div className="priceRange">
                        <span> Rs. {Number(item.node.priceRange.minVariantPrice.amount).toFixed(0)}</span> - <span>Rs. {Number(item.node.priceRange.maxVariantPrice.amount).toFixed(0)}  </span>
                    </div>


                ) :
                    (
                        <div className="price">
                            Rs. {Number(item.node.priceRange.maxVariantPrice.amount).toFixed(0)}
                        </div>
                    )



            }





        </div>
    )
}

export default ProductCard