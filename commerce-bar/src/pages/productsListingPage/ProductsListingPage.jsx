import React, { useEffect, useState } from 'react'
import './productsListingPage.css'
import { productsListByHandle } from '../../Services/api'
import { json, useParams, useSearchParams } from 'react-router-dom'
import ProductsFilter from '../../components/filtergroup/ProductsFilter'
import ProductCard from '../../components/productCard/ProductCard'
const ProductsListingPage = () => {

  const { handle } = useParams();
  const [filters, setFilters] = useState(null)
  const [filtersInput, setFiltersInput] = useState([])
  const [data, setData] = useState(null)

  const getProductsData = async () => {
    const { data } = await productsListByHandle(handle, JSON.stringify(filtersInput).replace(/\"([^(\")"]+)\":/g, "$1:"));
    const { filters } = data.data.collection.products;
    setFilters(filters);
    if (data) { setData(data.data.collection) };
    console.log(data)
    return data;

  }
  const combineFilters = (filtersList) => {
    let map = filtersList.map((filter) => {
      return Object.values(filter)[0]
    })
    setFiltersInput(map)
  }

  useEffect(() => {
    getProductsData()
  }, [handle, filtersInput])


  return (
    <div className='productsListingPage container'>
      {
        data?.products?.edges?.length > 1 && (

          <div className="filters">
            <ProductsFilter data={filters} combineFilters={combineFilters} />
          </div>
        )

      }

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
  )
}

export default ProductsListingPage