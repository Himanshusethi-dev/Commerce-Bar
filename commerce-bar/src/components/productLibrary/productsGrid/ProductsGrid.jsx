import React, { useEffect, useState } from 'react'
import { getRecommendedProducts } from '../../../Services/api';
import ProductCard from '../../productCard/ProductCard';
import Slider from "react-slick";
import "./productsGrid.css"

const ProductsGrid = ({ data, type, vID }) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true
    };

    const [productList, setProductList] = useState([])
    const [sectionType, setSectionType] = useState('Related Products')

    const fetchRecommendedProducts = async () => {
        console.log(type)

        try {
            const productsData = await getRecommendedProducts(data.id);
            console.log(productsData)
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

    useEffect(() => {

        console.log(productList)
    }, [productList])

    return (
        <>
            {
                productList.length && (
                    <>
                        <div className="productCarouselContainer">
                            <div className='productGridType'>{sectionType}</div>

                            <div className='productCarousel'>
                                <Slider {...settings}>
                                    {
                                        productList?.map((prod, index) => (
                                            <ProductCard data={productList} item={prod} key={index} />
                                        ))
                                    }
                                </Slider>
                            </div>
                        </div>

                    </>
                )
            }
        </>

    )
}

export default ProductsGrid