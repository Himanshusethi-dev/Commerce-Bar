import React, { useEffect, useState,useRef } from 'react'
import { getRecommendedProducts } from '../../../Services/api';
import ProductCard from '../../productCard/ProductCard';
import Slider from "react-slick";
import "./productsGrid.css"

const ProductsGrid = ({ data, type, vID,handle }) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                    
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2.5,
                        slidesToScroll: 1,
                    
                    }
                },
                {
                    breakpoint: 1330,
                    settings: {
                        slidesToShow: 3.5,
                        slidesToScroll: 1,
                    
                    }
                },

        ]
    };

    const [productList, setProductList] = useState([])
    const [sectionType, setSectionType] = useState('Related Products')
    const sliderRef = useRef();
    const fetchRecommendedProducts = async () => {
        // console.log(type)

        try {
            const productsData = await getRecommendedProducts(data.id);
            // console.log(productsData)
            setProductList(productsData);

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (type === 'Related Products') {
            setSectionType('Related Products')
            fetchRecommendedProducts()
        }

    }, [vID])

    useEffect(()=>{
       if(sliderRef.current){
        sliderRef.current.slickGoTo(0);
       }
    },[handle])

    useEffect(() => {

        // console.log(productList)
    }, [productList])

    return (
        <>
            {
                productList.length && (
                    <>
                        <div className="productCarouselContainer">
                            <div className='productGridType'>{sectionType}</div>

                            {

                                productList.length > 4 ? (
                                    <Slider ref={sliderRef} {...settings}>

                                        {
                                            productList?.map((prod, index) => (
                                                <ProductCard data={productList} item={prod} key={index} />
                                            ))

                                        }

                                    </Slider>
                                ) :

                                    (

                                        <div className="productsCardContainer">
                                            {
                                                productList?.map((prod, index) => (

                                                    <ProductCard data={productList} item={prod} key={index} />
                                                ))
                                            }
                                        </div>


                                    )
                            }


                        </div>

                    </>
                )
            }
        </>

    )
}

export default ProductsGrid