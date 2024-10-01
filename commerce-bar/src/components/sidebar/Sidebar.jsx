import React from 'react'
import './sidebar.css';
import { createPortal } from 'react-dom'

const Sidebar = ({ show,manageMobFilters, children }) => {
    return (
        createPortal(
            <div onClick={()=>{manageMobFilters(false)}}  className={`sidebar overlay ${show ? "open" : "hide"}` }>
                {children} 
            </div>
            , document.getElementById('portal'))

    )
}

export default Sidebar