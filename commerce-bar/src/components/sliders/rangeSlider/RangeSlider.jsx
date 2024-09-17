import React, { useEffect, useState,useMemo  } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './rangeSlider.css'

// const MAX = 1000;
// const MIN = 0;

export default function ProductRangeSlider({ data,managePriceFilter }) {

  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [rangeMax,setRangeMax] = useState(0);
  const [rangeMin,setRangeMin] = useState(0)
  const [barPosition,setBarPosition] = useState({
    "left" : min,
    "right" : max
  })

  useEffect(() => {
    const { max, min } = JSON.parse(data).price
    setMax(max);
    setMin(min);
    setRangeMin(min);
    setRangeMax(max);
    setBarPosition((barPosition)=>{return {...barPosition,left:min,right:max}})
  }, [])


  // useEffect(()=>{

  //   console.log("barPosition",barPosition);
  // },[barPosition])



  const handleChange =  (e,target)=>{
    if(target === 'min'){
        setMin(Number(e.target.value));
        setBarPosition((barPosition)=>{return {...barPosition,left:e.target.value}})
       
    }else{
      setMax(Number(e.target.value));
      setBarPosition((barPosition)=>{return {...barPosition,right:e.target.value}})
    }
  }

  const debounce = (func,wait)=>{
    let timer;
    return (...args)=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{
        func(...args);
      },wait)
    }

  }

 const debouncedManagePriceFilter =  useMemo(()=>{
     return debounce(managePriceFilter,500)    
  },[])

  useEffect(()=>{

    const finalPriceFilter = {price: { min: min, max: max }};
      debouncedManagePriceFilter("price",{price:finalPriceFilter})
  },[min,max])

  return (


    <>


      <div className="rangeSliderValues">

        <div className="min">
          <p>min</p>
          <input type="number" readOnly value={min}  onChange={(e)=>{handleChange(e,'min')}}    />
        </div>

        <div className="max">
          <p>max</p>
          <input type="number" readOnly value={max} onChange={(e)=>{handleChange(e,'max')}}    />
        </div>
      </div>

      <div className="progressBar">
        <div className="bar"   style={{
          left: `${((min - rangeMin) / (rangeMax - rangeMin)) * 100}%`,
          right: `${((rangeMax - max) / (rangeMax - rangeMin)) * 100}%`
        }}   ></div>
      </div>
      
      <div className="rangeInputs">
        <input type="range" className="minRange"  value={min}  min={0} max={rangeMax}  onChange={(e)=>{handleChange(e,'min')}}   />
        <input type="range" className="maxRange"  value={max}  min={0} max={rangeMax}  onChange={(e)=>{handleChange(e,'max')}}    />
      </div>

    </>



    // <Box sx={{ width: 250 }}>
    //   <Slider
    //     marks={range}
    //     step={100}
    //     value={val}
    //     valueLabelDisplay="auto"
    //     min={min}
    //     max={max}
    //     onChange={handleChange}
    //   />
    //     <Slider
    //     marks={range}
    //     step={100}
    //     value={val}
    //     valueLabelDisplay="auto"
    //     min={min}
    //     max={max}
    //     // onChange={handleChange}
    //   />
    //   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    //     <Typography
    //       variant="body2"
    //       onClick={() => setVal(min)}
    //       sx={{ cursor: 'pointer' }}
    //     >
    //       {val} min
    //     </Typography>
    //     <Typography
    //       variant="body2"
    //       onClick={() => setVal(max)}
    //       sx={{ cursor: 'pointer' }}
    //     >
    //       {max} max
    //     </Typography>
    //   </Box>
    // </Box>
  );
}