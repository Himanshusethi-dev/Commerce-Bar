import React, { useEffect, useState } from 'react'
import "./navigationMenu.css"
import { getMenuByHandle } from '../../Services/api'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NavigationPanel from './NavigationPanel'
import MenuTitle from './MenuTile'
import WrapperOverlay from '../modal/WrapperOverlay'

const NavigationMenu = () => {
    const { authToken } = useSelector((state) => state.authProvider)
    const [menu, setMenu] = useState(null);
    const [show,setShow] = useState(false);
 
    useEffect(() => {
        fetchNavigationMenu()
    }, [])

    useEffect(() => {
        console.log("menuData", menu)
    }, [menu])

    const fetchNavigationMenu = async () => {

        const { data: { data } } = await getMenuByHandle(`header-menu`)
        // console.log("menuFetched",data)
        setMenu(data?.menu)
    }
    const updateShowState = (value)=>{
        setShow(value);

    }
    return (
        <nav className='headerMenu'>

            {
                menu?.items.length > 0 && (

                    <ul className="menuItems">
                        {
                            menu.items?.map((item, i) => (

                                <MenuTitle updateShowState={updateShowState}  data={item} handle={item?.resource?.handle}  key={i}  />
                                    // i < 1 && (
                                    //     <MenuTitle  updateShowState={updateShowState}   data={item} handle={item?.resource?.handle}  key={i}  />
                                    // )
                                
                                
                            ))
                        }

                    </ul>


                )
            }

            {
                show && (
                    <WrapperOverlay  show={show}/>
                )
            }

         


        </nav>
    )
}

export default NavigationMenu