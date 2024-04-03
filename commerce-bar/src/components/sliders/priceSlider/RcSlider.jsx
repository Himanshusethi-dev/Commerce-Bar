import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const RcSlider = ({minPriceValue},{maxPriceValue}) => {
    return (
        <Slider
            min={ minPriceValue }
            max={ maxPriceValue }
            step={1}
            range={true}
            defaultValue={[{ minPriceValue }, { maxPriceValue }]}
            // onChange={handleSliderChange}
        />
    )
}

export default RcSlider