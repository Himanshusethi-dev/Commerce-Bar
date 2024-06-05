import { useEffect, useState } from 'react'
import QuantitySelector from '../quantitySelector/QuantitySelector'
// import QuantityModal from '../quantitySelector/QuantityModal'
import { MdArrowDropDown } from "react-icons/md";
import Modal from '../modal/Modal';
import SelectorButtons from '../buttons/SelectorButtons';

const CartLineItem = ({ lineItem }) => {
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const [quantityLimitArr, setQuantityLimitArr] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const buttonLength = []
    useEffect(() => {
        buildButtons()
    }, [])

    const getQuantity = (qty) => {
        setCurrentQuantity(qty)
    }
    const buildButtons = () => {
        for (let i = 1; i <= 10; i++) {
            buttonLength.push(i)
        }
        setQuantityLimitArr(buttonLength)
        console.log(buttonLength)

    }


    const { id, merchandise, quantity, cost } = lineItem;
    return (
        <>
            <div className="cartItem">
                <div className="cartItemMedia">
                    <div className="cartItemImage">
                        <img src={`${merchandise.image.url}`} alt="" />
                    </div>
                </div>
                <div className="cartItemInfo">
                    <div className="infoContent">
                        <div className="productVendor">
                            {merchandise.product.vendor}
                        </div>
                        <div className="cartItemTitle">
                            {merchandise.product.title}
                        </div>
                        <div className='itemPriceContainer' >
                            <span className="itemPrice">
                                &#8377; {Math.ceil(merchandise.price.amount)}
                            </span>
                            <span className="itemComparePrice">
                                &#8377;  {Math.ceil(merchandise.compareAtPrice.amount)}
                            </span>
                        </div>
                        <div className="cartItemQuantity">
                            Quantity :
                            <button onClick={(() => { setIsOpen(true) })} className='quantityUpdateButton'>
                                {quantity} <MdArrowDropDown />
                            </button>
                        </div>

                        <div className="totalItemLineCost">
                            {Math.ceil(cost.totalAmount.amount)}
                        </div>
                        <Modal isOpen={isOpen} setIsOpen={setIsOpen} type={"quantity"} >
                            <div className="modalContent">
                                <SelectorButtons quantityLimitArr={quantityLimitArr} selectedQuantity={quantity}  />
                            </div>
                        </Modal>
                    </div>

                </div>

            </div>

        </>
    )
}

export default CartLineItem