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
            <div onClick={() => { setIsOpen(false) }} className='overlay'>

              <div onClick={(e)=>{e.stopPropagation()}}  className="modalBox">
                <div className="closeModalButton">
                  <button onClick={() => { setIsOpen(false) }}  >
                  <IoMdClose />

                  </button>
                </div>
                <div className="modalContentContainer">
                  <div className="modalHeader">
                    {type != null ? (
                        <div className='modalHeaderText'>
                            Select {type}
                        </div>
                    ) 
                    : (
                     ""
                    )}
                  </div>
                  <div className="modalContent">
                      {children}
                  </div>
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