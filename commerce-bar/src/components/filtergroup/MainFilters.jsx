import React from 'react'
import { useEffect } from 'react'

const MainFilters = ({ data }) => {

    useEffect(() => {
        (data.products.filters.map((filter) => {

            console.log(filter.label)
        }))

    }, [data])
    return (

        <>
            <div>Filter: </div>



            <div className="filterGroup">


                

                {

                    data?.products?.filters?.map((fl) => (

                        <>
                        
                        <div className="filterItem" key={fl.id}>

                            <div className="filterLabel">
                                {fl.label}
                            </div>                        


                           
                        </div>
                        </>
                       
                    ))

                }


            </div>

        </>


    )
}

export default MainFilters