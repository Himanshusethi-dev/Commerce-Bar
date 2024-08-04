import React, { Fragment } from 'react'
import { getCollectionsQuery } from '../../Services/api'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import './collectionsList.css' 

const CollectionsList = () => {

    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllCollections()

        //    setData(data)
    }, [])

    useEffect(() => {
        // console.log(data)
    }, [data])

    const fetchAllCollections = async () => {

        const res = await getCollectionsQuery();
        setData(res)
    }


    const navigateHandle = (handle) => {

        navigate(`/collections/${handle}`)


    }


    return (

        <>
            {
                !!data && (

                    <div className='collectionsList container'>
                        {
                            data?.map((item) => (
                                <Fragment key={item.node.id}>



                                    <div className="coll-card" onClick={() => { navigateHandle(item.node.handle) }}>
                                        <div className="collInfo">

                                            <div className="coll-title">
                                                {item.node.title}
                                            </div>

                                            {/* <div className="description">
                                                {item.node.description}
                                            </div> */}

                                        </div>


                                        <div className="coll-image">
                                            <img src={`${item?.node?.image?.url}`} alt="" />
                                        </div>

                                    </div>



                                </Fragment>


                            ))
                        }
                    </div>


                )

            }




        </>
        // <div>ProductList</div>
    )
}

export default CollectionsList