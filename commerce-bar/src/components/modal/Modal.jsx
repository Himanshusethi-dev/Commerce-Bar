import React from 'react'
import "./modal.css"
import { createPortal } from 'react-dom'
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, setIsOpen, children, type }) => {
  return (

    <>
      {
        isOpen && (
          createPortal(
            <div onClick={() => { setIsOpen(false) }} className='modalOverlay'>

              <div onClick={(e)=>{e.stopPropagation()}}  className="modalBox">
                <div className="closeModalButton">
                  <button onClick={() => { setIsOpen(false) }}  >
                  <IoMdClose />

                  </button>
                </div>
                <div className="modalContentContainer">

                  <div className="header">
                    {type == 'quantity' ? (
                    
                    <div className='headerText'>
                        Select Quantity
                    </div>) 
                    
                    : (
                      <div></div>
                    )}
                  </div>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, dolores. Facere illo quis esse tempore, neque in mollitia excepturi iste? */}
                  {children}
                </div>
              </div>

            </div>,
            document.getElementById('portal')
          )
        )

      }
    </>




  )
}

export default Modal