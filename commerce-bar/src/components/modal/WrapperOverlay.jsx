import React from 'react'
import { createPortal } from 'react-dom'
import "./wrapperOverlay.css"
const WrapperOverlay = ({show}) => {

  const portalRoot = document.getElementById('overlay');
  
  if (!portalRoot) {
    console.error('Portal root element does not exist');
    return null;
  }

  return (
  
    <>

        {
           (
              createPortal(
                <div className={`wrapperOverlay ${show ? "show" : "" } `}></div>,
                portalRoot
              )
            )
           
        }
    
    {/* <div className="wrapperOverlay"></div> */}
    </>
  )
}

export default WrapperOverlay