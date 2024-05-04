import React, { useEffect, useRef } from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import placeholderImage from '../../assets/placeholderImage.png'
import "./productMedia.css"
const  MediaSlider = ({ data, showThumbNails }) => {
    const sliderRef = useRef(null)
    const thumbSliderRef = useRef(null)
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null)
    const initialSlidePosRef = useRef(0)
   

    useEffect(() => {
        setButtonsStateOnMount();
    }, [])

    const setButtonsStateOnMount = () => {
        if (leftButtonRef.current !== null) {
            leftButtonRef.current.disabled = true;
        }
    }

    const controlMainSlider = (operation) => {
        setButtonsState(operation)
        let index = initialSlidePosRef.current;
        manipulateScrollValues(index)
    }

    const thumnailControlSlider = (index) => {
        manipulateScrollValues(index)
        initialSlidePosRef.current = index
    }
    

    const setButtonsState = (operation)=>{
        if (!operation) {
            rightButtonRef.current.disabled = false;
            initialSlidePosRef.current -= 1
        } else {
            leftButtonRef.current.disabled = false;
            initialSlidePosRef.current += 1
        }
    }

    const manipulateScrollValues =(index)=>{
        let scrollValue = (sliderRef.current.children[0].offsetWidth * index) * -1
        let thumbscrollValue = (thumbSliderRef?.current?.children[0].offsetWidth * (index - 1)) * -1
        sliderRef.current.childNodes.forEach(slide => slide.style.transform = `translateX(${scrollValue}px)`)
        thumbSliderRef.current.childNodes.forEach((thumb, ix) => {
            thumb.style.border = 'none'
            if (ix === index) thumb.style.border = '1px solid black';
            if (index !== 0) thumb.style.transform = `translateX(${thumbscrollValue}px)`;
        })
        index === sliderRef.current.childElementCount - 1 ? rightButtonRef.current.disabled = true : rightButtonRef.current.disabled = false;
        index === 0 ? leftButtonRef.current.disabled = true : leftButtonRef.current.disabled = false;
    }

   

    return (
        <>
            {
                data?.images ? (
                    <div className="mediaContainer">
                        <div className="imagesTrackContainer">
                            <div className="mainImageTrack">
                                {
                                    data?.images?.edges.length > 1 && (
                                        <button ref={leftButtonRef} onClick={() => { controlMainSlider(false) }} className='mediaSlider slideLeft'>
                                            <MdOutlineKeyboardArrowLeft />
                                        </button>
                                    )
                                }
                                <div ref={sliderRef} className="imagesTrack" >
                                    {data.images.edges.map((item) => (
                                        <div key={item.node.id} className={`prodimage ${data.images.edges.length === 1 ? "showOne" : ""}`}>
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
                            {
                                !!showThumbNails && (
                                    data.images.edges.length > 1 && (
                                        <div className="thumbnailsTrack">
                                            <div ref={thumbSliderRef} className="imagesTrackthumbnails" >
                                                {data.images.edges.map((item, index) => (
                                                    <div onClick={() => { thumnailControlSlider(index) }} key={item.node.id} className="prodimage">
                                                        <img src={item.node.url} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                )
                    : (
                        <div className="noData">
                            <div className='prodimage showOne'>
                                <img width='200' src={placeholderImage} alt="" />
                            </div>
                        </div>

                    )
            }

        </>
    )
}

export default MediaSlider