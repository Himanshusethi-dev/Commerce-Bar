import {React,useEffect,useState} from 'react'
import "./quantitySelector.css"
const QuantitySelector = ({getQuantity}) => {
    const [quantity,setQuantity] = useState(1);
    const [minusdisabledButton,setMinusDisabledButton] = useState(true)
    const [plusdisabledButton,setPlusDisabledButton] = useState(false)
    const maxQunatity = 5;
    const minQantity = 1;
    const quantityHandler = (operation)=>{
            if(operation === 'plus'){
                setQuantity(quantity + 1)
                if(quantity  === maxQunatity - 1 ) {
                    setPlusDisabledButton(true) 
                    return;
                } 
                if(quantity  === minQantity ) {
                    setMinusDisabledButton(false) 
                    return;
                } 
            }else{
                setQuantity(quantity - 1)
                if(quantity  === minQantity + 1 ) {
                    setMinusDisabledButton(true)
                     return;
                }
                if(quantity === maxQunatity){
                    setPlusDisabledButton(false) 
                }
            }

    }


    useEffect(()=>{
     console.log('fdfjdfj')   
    })
    useEffect(()=>{
        getQuantity(quantity)

    },[quantity])


  return (
    <>

        <div className="quantitySelector">
            <button className='minus'  disabled={minusdisabledButton ? true : false}   onClick={()=>{quantityHandler('minus')}}>-</button>
            <input type="number" readOnly className="quantityInput" id="quantityInput" value={quantity} onChange={(e)=>{quantityHandler}} min="1" max="5"/>
            <button className='plus' disabled={plusdisabledButton ? true : false}  onClick={()=>{quantityHandler('plus')}}  >+</button>
        </div>
    
    </>
  )
}

export default QuantitySelector