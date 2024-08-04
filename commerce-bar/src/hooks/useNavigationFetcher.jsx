import React, { useEffect, useState } from 'react'
import { getMenuByHandle } from '../Services/api'
const useNavigationFetcher = (handle) => {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    const fetchNavigationMenu = async () => {

      const { data: { data } } = await getMenuByHandle(`${handle}`)
      console.log("menuFetched",data)
      setMenu(data?.menu)
    }
    fetchNavigationMenu()
  }, [handle])

  useEffect(() => {
    // console.log("menuData", menu)
  }, [menu])


  return (
    menu
  )
}

export default useNavigationFetcher