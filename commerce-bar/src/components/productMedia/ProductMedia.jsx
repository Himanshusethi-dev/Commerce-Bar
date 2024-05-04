import React, { useEffect, useRef } from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./productMedia.css"
const ProductMedia = ({ data }) => {
    let initialPosition = 0;
    const sliderRef = useRef(null)
    const thumbSliderRef = useRef(null)
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null)
    const initialSlidePosRef = useRef(0)
    const setSliderButtons = () => {
        if (initialPosition === 0 && leftButtonRef.current !== null) {
            leftButtonRef.current.disabled = true;
        }
    }

    useEffect(() => {
        setSliderButtons();
    }, [initialPosition])

    useEffect(()=>{
        console.log(initialSlidePosRef,"initialSlidePosRef")
    },[initialSlidePosRef])

    const controlMainSlider = (operation) => {
        console.log(sliderRef)
        let scrollValue;
        if (!operation) {
            rightButtonRef.current.disabled = false;
            if (initialPosition === 0) return;
            scrollValue = (sliderRef.current.children[0].offsetWidth - initialPosition);
            if (initialPosition === sliderRef.current.clientWidth) {
                leftButtonRef.current.disabled = true;
            }
            if(initialSlidePosRef.current  === 0) return
            initialSlidePosRef.current -= 1

        } else {
            leftButtonRef.current.disabled = false;
            if (Math.abs(initialPosition) === sliderRef.current.clientWidth * (sliderRef.current.childElementCount - 1)) return;
            if (Math.abs(initialPosition) === sliderRef.current.clientWidth * (sliderRef.current.childElementCount - 2)) {
                rightButtonRef.current.disabled = true;
            }
            scrollValue = (sliderRef.current.children[0].offsetWidth + initialPosition) * -1;
            if(initialSlidePosRef.current >=  sliderRef.current.childElementCount.length) return
            initialSlidePosRef.current += 1
        }
        Array.from(sliderRef.current.children).forEach((slide) => {
            slide.style.transform = `translateX(${scrollValue}px)`
        })
        initialPosition = Math.abs(scrollValue)
        let thumbscrollValue = (thumbSliderRef.current.children[0].offsetWidth * (initialSlidePosRef.current - 1)) * -1
        thumbSliderRef.current.childNodes.forEach((thumb, ix) => {
            thumb.style.border = 'none'
            if (ix === initialSlidePosRef.current) {
                thumb.style.border = '1px solid black'
            }
            if (initialSlidePosRef.current !== 0) {
                thumb.style.transform = `translateX(${thumbscrollValue}px)`
            }
        })
        console.log(initialSlidePosRef)
    }

    const thumnailControlSlider = (index) => {
        console.log(index)
       
        console.log(thumbSliderRef)
        let scrollValue = (sliderRef.current.children[0].offsetWidth * index) * -1
        let thumbscrollValue = (thumbSliderRef.current.children[0].offsetWidth * (index - 1)) * -1
        sliderRef.current.childNodes.forEach((slide) => {
            slide.style.transform = `translateX(${scrollValue}px)`
        })
        thumbSliderRef.current.childNodes.forEach((thumb, ix) => {
            thumb.style.border = 'none'
            if (ix === index) {
                thumb.style.border = '1px solid black'
            }
            if (index !== 0) {
                thumb.style.transform = `translateX(${thumbscrollValue}px)`
            }
        })
        if (index === sliderRef.current.childElementCount - 1) {
            rightButtonRef.current.disabled = true;
            // leftButtonRef.current.disabled = false;
        } else {
            rightButtonRef.current.disabled = false;
            // leftButtonRef.current.disabled = true;
        }
        if (index === 0) {
            leftButtonRef.current.disabled = true;
        } else {
            leftButtonRef.current.disabled = false;
        }
        initialPosition = Math.abs(scrollValue)
        initialSlidePosRef.current = index 
    }

    return (
        <>
            <div className="mediaContainer">
                <div className="imagesTrackContainer">
                    <div className="mainImageTrack">
                        {
                            data.images.edges.length > 1 && (
                                <button ref={leftButtonRef} onClick={() => { controlMainSlider(false) }} className='mediaSlider slideLeft'>
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                            )
                        }

                        <div ref={sliderRef} className="imagesTrack" >
                            {data.images.edges.map((item) => (
                                <div key={item.node.id} className="prodimage">
                                    <img src={item.node.url} />
                                </div>
                            ))}
                        </div>

                        {
                            data.images.edges.length > 1 && (
                                <button ref={rightButtonRef} onClick={() => { controlMainSlider(true) }} className='mediaSlider slideRight'>
                                    <MdOutlineKeyboardArrowRight />
                                </button>
                            )
                        }
                    </div>

                    <div className="thumbnailsTrack">
                        {

                            data.images.edges.length > 1 && (

                                <div ref={thumbSliderRef} className="imagesTrackthumbnails" >
                                    {data.images.edges.map((item, index) => (
                                        <div onClick={() => { thumnailControlSlider(index) }} key={item.node.id} className="prodimage">
                                            <img src={item.node.url} />
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductMedia