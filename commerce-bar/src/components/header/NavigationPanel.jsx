import React, { Fragment, useEffect, useState } from 'react'
import "./navigationMenu.css"
import { Link } from 'react-router-dom'
import { getMetaObjectByID, getMedia, getProductById } from '../../Services/api'
import ProductCard from '../productCard/ProductCard'
const NavigationPanel = ({ data, collectionData }) => {


    // const {metafields} = collectionData || {}
    const [collectionMetafieldsData, setCollectionMetafieldsData] = useState({})
    const [collectionMetaObjectData, setCollectionMetaObjectData] = useState({})
    const [menuShowcaseData, setMenuShowcaseData] = useState({
        menuImage: {},
        menuProduct: []
    })
    useEffect(() => {
        setCollectionMetafieldsData(collectionData?.metafields)
    }, [collectionData])
    useEffect(() => {
        // console.log("collectiONdDATE",collectionMetafieldsData)
        getMetaObjectData()
    }, [collectionMetafieldsData])
    useEffect(() => {
        getMetaObjectMedia()
    }, [collectionMetaObjectData])


    useEffect(() => {
        // console.log("menuShowcaseData", menuShowcaseData)
    }, [menuShowcaseData])

    const getMetaObjectData = async () => {

        let metaObjectId = null;
        if (collectionMetafieldsData) {
            if (collectionMetafieldsData.length > 0) {
                collectionMetafieldsData.forEach((mfd) => {
                    if (mfd != null && mfd.key === 'collection_menu_data') {
                        metaObjectId = mfd.value
                    }

                });
            }
        }
        if (metaObjectId != null) {
            // console.log("metaObjectIdPreFetch",metaObjectId)
            const { data: { data } } = await getMetaObjectByID(metaObjectId)
            // console.log("metaObjectID",data.metaobject)
            setCollectionMetaObjectData(data.metaobject)
        }

    }

    const getMetaObjectMedia = async () => {

        let fetchMetaMedia = false;
        let id = null;
        let productListResolvers = []
        let productMediaResolver;
        if (collectionMetaObjectData) {
            if (collectionMetaObjectData?.fields?.length > 0) {
                collectionMetaObjectData?.fields?.forEach((item, i) => {
                    if (item != null) {
                        if (item.key === 'menu_item_featured_products') {
                            let handleList = JSON.parse(item.value);
                            // console.log("handleList",handleList)
                            if (handleList.length > 0) {
                                productListResolvers = handleList.map((handleItem) => {
                                    return getMenuShowcaseProducts(handleItem)
                                    // console.log("getMenuShowcaseProducts",data)
                                })
                            }
                        }

                        if (item.key === 'menu_item_images') {
                            // console.log("promises",promises)
                            id = JSON.parse(item.value)
                            fetchMetaMedia = true
                            productMediaResolver = getMenuShowcaseMedia(id)
                        }
                    }
                })
            }
        }

        if (fetchMetaMedia && id != null) {
            let productList = await Promise.all(productListResolvers);
            let productMedia = await Promise.resolve(productMediaResolver)
            setMenuShowcaseData({ ...menuShowcaseData, menuProduct: productList, menuImage: productMedia })
        }
    }

    const getMenuShowcaseMedia = async (id) => {
        const { data: { data } } = await getMedia(id[0])
        return data.node
    }

    const getMenuShowcaseProducts = async (id) => {
        const { data: { data } } = await getProductById(id)
        return data;
    }

    const { menuProduct } = menuShowcaseData;
    return (
        <div className='megaMenuPanel'>
            <div className="insidePanelMenuItems">
                <div className="menuLevelTwo">
                    <div className="menuLevelTwoTitle">
                        {data.title}
                    </div>
                    <ul className="menuLevelTwoItems">
                        {
                            data?.items?.map((item, i) => (

                                <li key={i} className="menuLevelTwoItem">
                                    <Link to={`/collections/${item?.resource?.handle || item?.handle}`}>
                                        {item.title}
                                    </Link>

                                </li>

                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="insideShowcase">


                {

                    menuShowcaseData?.menuImage?.image && (


                        <div className="menuShowcaseImage">
                            <img src={`${menuShowcaseData?.menuImage?.image?.url}`} alt="" />
                        </div>

                    )
                }

                <div className="menuShowcaseProducts">
                    {
                        menuProduct.length > 0 && (

                            menuProduct.map((node, index) => (
                                <Fragment key={index}>
                                    <ProductCard data={menuProduct} item={node.product} key={index} />
                                </Fragment>



                            ))
                        )
                    }
                </div>


                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero hic cupiditate fugiat laborum, quia minima magni doloremque voluptatem, debitis obcaecati quo! Molestiae possimus natus quidem adipisci aut repudiandae ratione quas libero dolores, repellendus amet laudantium, inventore voluptatem cum vitae facere commodi maiores? Rem excepturi alias nam, tenetur veritatis nobis hic dicta incidunt? Rem distinctio sequi id dolore recusandae! Rem, assumenda corrupti? Ipsam beatae voluptatibus dolor reprehenderit fuga, quis molestias laboriosam impedit quo voluptatem a, consequatur autem illum maiores pariatur expedita. Dolor repellendus earum sunt officia, harum ea assumenda corrupti explicabo nesciunt velit. Quam debitis est, qui dolorem vel eligendi. Quam, nemo accusamus, animi ducimus porro adipisci in a explicabo id minus dolor eos deserunt mollitia nulla est harum nesciunt inventore laudantium laborum, perspiciatis rerum? Ad consequatur odio commodi unde similique distinctio voluptatum qui repellendus tenetur assumenda ea tempore recusandae numquam sed suscipit quia, quaerat nobis vero autem soluta voluptatibus dolor magnam libero. Maiores consequuntur, minima quis laudantium eveniet rerum saepe. Ab dolore laudantium incidunt et aspernatur numquam molestias natus deleniti ipsam voluptates eveniet beatae vel quia ipsum labore, obcaecati, vero reprehenderit consequuntur esse, accusantium nam nulla voluptate voluptatum doloremque? Molestias quo libero facere labore nemo, dicta corporis placeat temporibus eum! */}
            </div>
        </div>
    )
}

export default NavigationPanel