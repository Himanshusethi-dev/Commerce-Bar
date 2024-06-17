import React, { useEffect, useState } from 'react'
import "./navigationMenu.css"
import { getMenuByHandle } from '../../Services/api'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NavigationPanel from './NavigationPanel'
import MenuTitle from './MenuTile'

const NavigationMenu = () => {
    const { authToken } = useSelector((state) => state.authProvider)
    const [menu, setMenu] = useState(null);

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
    return (
        <nav className='headerMenu'>

            {
                menu?.items.length > 0 && (

                    <ul className="menuItems">
                        {
                            menu.items?.map((item, i) => (

                                <MenuTitle   data={item} handle={item?.resource?.handle}  key={i}  />
                                    // i < 1 && (
                                    //     <MenuTitle   data={item} handle={item?.resource?.handle}  key={i}  />
                                    // )
                                
                                
                            ))
                        }

                    </ul>


                )
            }


        </nav>
    )
}

export default NavigationMenu