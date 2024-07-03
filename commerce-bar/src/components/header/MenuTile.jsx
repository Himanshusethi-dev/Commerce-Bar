import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavigationPanel from './NavigationPanel'
import { getCollectionByHandle } from '../../Services/api'
import { getMenuCollectionsData } from '../../Services/api'
import WrapperOverlay from '../modal/WrapperOverlay'

const MenuTitle = ({ data, handle,updateShowState }) => {


    const [show, setShow] = useState(false)
    const [collData, setCollData] = useState(null);
    useEffect(() => {
        fetchCollectionForMenu()
       
    }, [data])

    const fetchCollectionForMenu = async () => {

        const { data: { data } } = await getMenuCollectionsData(handle)
        // console.log("resp",data)
        setCollData(data.collection)
    }

    const handleMegaMenu = (value) => {
        setShow(value)
        updateShowState(value)
    }
    // onMouseLeave={()=>{setShow(false)}}  onMouseOver={()=>{setShow(true)}} 

    // onMouseLeave={()=>{handleMegaMenu(false)}}
    // onMouseOver={()=>{handleMegaMenu(true)}}  
    return (
        <>
            <li
                onMouseLeave={() => { handleMegaMenu(false) }}
                onMouseOver={() => { handleMegaMenu(true) }}
                className={`menuItem levelOne ${show ? "isActive" : ""}`}>
                <Link to={`/collections/${handle}`}>
                    {data?.title}
                </Link>

                {


                    <NavigationPanel
                        show={show}
                        data={data}
                        collectionData={collData}
                        handle={handle} >
                    </NavigationPanel>

                


                }

            </li>
        </>
    )
}

export default MenuTitle