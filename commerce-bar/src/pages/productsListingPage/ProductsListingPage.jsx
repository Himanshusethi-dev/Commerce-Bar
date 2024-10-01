import React, { useEffect, useState } from 'react'
import './productsListingPage.css'
import { productsListByHandle } from '../../Services/api'
import { json, useParams, useSearchParams } from 'react-router-dom'
import ProductsFilter from '../../components/filtergroup/ProductsFilter'
import ProductCard from '../../components/productCard/ProductCard'
import MediaQuery from "react-responsive";
import Sidebar from '../../components/sidebar/Sidebar';
import { IoMdClose } from "react-icons/io";
import Loader from '../../components/loader/Loader'


const ProductsListingPage = () => {

  const { handle } = useParams();
  const [filters, setFilters] = useState(null)
  const [filtersInput, setFiltersInput] = useState([])
  const [data, setData] = useState(null)
  const [showMobFilter,setShowMobFilter] = useState(false);
  const [loading,setLoading] = useState(false);

  const getProductsData = async () => {
    setLoading(true);
    try {
      const { data } = await productsListByHandle(handle, JSON.stringify(filtersInput).replace(/\"([^(\")"]+)\":/g, "$1:"));
      const { filters } = data.data.collection.products;
      setFilters(filters);
      setLoading(false);
      if (data) { setData(data.data.collection) };
      // console.log(data)
      return data;
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
    
   

  }
  const combineFilters = (filtersList) => {
    let map = filtersList.map((filter) => {
      return Object.values(filter)[0]
    })
    setFiltersInput(map)
  }

  const manageMobFilters = (state)=>{
      setShowMobFilter(state);
  }

  useEffect(() => {
    getProductsData()
  }, [handle, filtersInput])
  
//   if (loading) {
//     return <div>
//         <Loader>
           
//         </Loader>
//     </div>
// } 

  return (
    <div className="container">
       <div className='productsListing'>
      <div className="utilities">
        
      <MediaQuery query="(max-width: 1023px)">
        <button className='mobFilterTrigger' onClick={()=>{manageMobFilters(true)}}> Filters </button>
      </MediaQuery> 
             
      </div>
      <div className='productsListingPage '>
              <Loader loading={loading}   />
            <>
              <MediaQuery query="(min-width: 1024px)">
                <div className="filters">
                  <ProductsFilter data={filters} combineFilters={combineFilters} />
                </div>
              </MediaQuery>

              <MediaQuery query="(max-width: 1023px)">
                <Sidebar show={showMobFilter} manageMobFilters={manageMobFilters} >
                
                  <div className="filters" onClick={(e)=>{e.stopPropagation()}}>
                    <Loader loading={loading}   />
                    <button className='mobFilterCloseButton' onClick={()=>{setShowMobFilter(false)}}>
                    <IoMdClose />
                    </button>
                    <ProductsFilter data={filters} combineFilters={combineFilters} />
                  </div>

                </Sidebar>
              </MediaQuery>
            </>

        <div className="collectionProductList">
          {
            !!data?.products?.edges?.length > 0 && (
              <>
                <div className="totalProducts">
                  {data?.products?.edges?.length} Products
                </div>
                <div className="productGrid">
                  {
                    data.products?.edges.map((item, index) => (
                      <ProductCard data={data} item={item.node} key={index} />
                    ))
                  }
                </div>
              </>
            )
          }
        </div>



      </div>
    </div>
    </div>
   

  )
}

export default ProductsListingPage