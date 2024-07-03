import { useEffect, useState } from 'react'
import "./selectorButtons.css"
const SelectorButtons = ({ type, limit, selectedValue, updateValue, setIsOpen }) => {

    const [selectedButton, setSelectedButton] = useState(selectedValue)
    const changeQuantity = () => {
        setIsOpen(false)
        updateValue(selectedButton, type)
    }



    return (
        <>
            <div className="selectorButtonsContainer">
                <>
                    <div className="selectorButtons">
                        {
                            limit.map((value, i) => {
                                return (
                                    <>
                                        {
                                            type === 'quantity' ? (
                                                <button onClick={() => { setSelectedButton(value) }} className={`quantityButton  ${value === selectedButton ? "selected" : ""}`} key={i}>
                                                    {value}
                                                </button>
                                            )
                                                :
                                                (
                                                    <button onClick={() => { setSelectedButton(value.id) }} className={`variantButton  ${value.id === selectedButton ? "selected" : ""}`} key={i}>
                                                        {value.title}
                                                    </button>
                                                )
                                        }
                                    </>
                                )
                            }
                            )
                        }
                    </div>

                    <button  className='selectionSubmit' onClick={() => { changeQuantity() }}>
                        Done
                    </button>
                </>
            </div>


        </>
    )
}

export default SelectorButtons