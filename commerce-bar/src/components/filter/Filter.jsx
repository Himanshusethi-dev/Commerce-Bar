import React, { useEffect } from 'react'

const Filter = ({ getSortParams, data }) => {

  const sortProducts = (e) => {

    // console.log(e.target.value)
    getSortParams(e.target.value)

  }
 
  return (

    <>

      <div className="sortByFilter">

        <div className="filterTitle">
          <label htmlFor="sort-by">Sort By</label>

          <select name="sort_by" id="sort-by" onChange={sortProducts} >
            <option value='{"sort":"MANUAL","reverse":false}'>Featured</option>
            <option value='{"sort":"TITLE","reverse":false}'>Alphabetically, A-Z</option>
            <option value='{"sort":"TITLE","reverse":true}'>Alphabetically, Z-A</option>
            <option value='{"sort":"PRICE","reverse":false}'>Price, low to high</option>
            <option value='{"sort":"PRICE","reverse":true}'> Price, high to low</option>
          </select>


        </div>


      </div>


    </>


  )
}

export default Filter