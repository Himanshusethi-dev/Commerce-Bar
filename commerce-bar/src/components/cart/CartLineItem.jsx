import { useEffect, useState } from 'react'
import QuantitySelector from '../quantitySelector/QuantitySelector'
// import QuantityModal from '../quantitySelector/QuantityModal'
import { MdArrowDropDown,MdDelete } from "react-icons/md";

import Modal from '../modal/Modal';
import SelectorButtons from '../buttons/SelectorButtons';
import { updateCartLine } from '../../Services/api';
import { updateCartLineThunk, fetchCartThunk,deleteCartLineThunk } from '../../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const modalOptions = {
    quantity: "quantity",
    variant: "variant"
}

const CartLineItem = ({ cartId, lineItem }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantityLimitArr, setQuantityLimitArr] = useState([])
    const [lineItemVariants, setLineItemVariants] = useState([])
    const [selectedQuantity, setSelectedQuantity] = useState(lineItem.quantity);
    const [selectedVariant, setSelectedVariant] = useState(lineItem.merchandise.id)
    const [currentVariant, setCurrentVariant] = useState(null);
    const [type, setType] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        buildQuantityButtons()
        buildVariantButtons()
    }, [])

    useEffect(() => {
        getCurrentVariant()
    }, [selectedVariant])

    const getCurrentVariant = () => {
        lineItem.merchandise.product.variants.edges.forEach((item) => {
            if (item.node.id === selectedVariant) {
                setCurrentVariant(item.node.title)
            }
        })
    }

    const updateLineItemQuantity = async (value, type) => {

        const linesObj = {
            id: `${lineItem.id}`,
            merchandiseId: type === modalOptions.variant ? value : selectedVariant,
            quantity: type === modalOptions.quantity ? value : selectedQuantity
        }
        dispatch(updateCartLineThunk(
            {
                cartId: cartId,
                lines: linesObj
            }
        )).unwrap()
            .then((result) => {
                // console.log('Data fetched successfully:', result);
                dispatch(fetchCartThunk(cartId)).unwrap().then((data) => {
                    // console.log(' fetched successfully:', data);
                })
            })
    }

    const buildQuantityButtons = () => {
        let loopLimit = 0;
        const buttonLength = []
        lineItem.merchandise.product.variants.edges.forEach((item) => {
            if (item.node.id === selectedVariant) {
                loopLimit = item.node.quantityAvailable
            }
        });

        if(loopLimit > 10 ) {
            loopLimit = 10
        }
        for (let i = 1; i <= loopLimit; i++) {
            buttonLength.push(i)
        }

        setQuantityLimitArr(buttonLength)

    }

    const buildVariantButtons = () => {
        const variantButtons = []
        lineItem.merchandise.product.variants.edges.map((connection) => (
            variantButtons.push(
                {
                    title: connection.node.title,
                    id: connection.node.id
                }
            )
        ))

        setLineItemVariants(variantButtons)

    }

    const updateSelectedOptions = (value, type) => {
        console.log("updateSelectedOptions", value, "type", type)
        if (type === modalOptions.quantity) {
            setSelectedQuantity(value)
        } else if (type === modalOptions.variant) {
            setSelectedVariant(value)

        }
        updateLineItemQuantity(value, type)
    }

    const handleModals = (type) => {
        setType(type)
        setIsOpen(true)
    }

    const deleteCartItem = (lineID)=>{

            dispatch(deleteCartLineThunk(
                {
                    cartId: cartId,
                    lineIds: [lineID]
                }
            )).unwrap()
            .then((result) => {
                // console.log('Data fetched successfully:', result);
                dispatch(fetchCartThunk(cartId)).unwrap().then((data) => {
                     console.log(' deleted successfully:', data);
                })
            })
        
    }

    const { id, merchandise, quantity, cost } = lineItem;
    return (
        <>
            <div className="cartItem">
                <div className="cartItemMedia">
                    <div  onClick={()=>{navigate(`/products/${merchandise.product.handle}`)}}   className="cartItemImage">
                        <img src={`${merchandise.image.url}`} alt="" />
                    </div>
                </div>
                <div className="cartItemInfo">
                    <div className="infoContent">
                        <div className="productVendor">
                            {merchandise.product.vendor}
                        </div>
                        <div  onClick={()=>{navigate(`/products/${merchandise.product.handle}`)}}   className="cartItemTitle">
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

                        <div className="cartLineItemQuantityAndVariantContainer">
                            <div className="cartItemQuantity">
                              
                                <button onClick={(() => { handleModals(modalOptions.quantity) })} className='quantityUpdateButton'>
                                Quantity :   {quantity} <MdArrowDropDown />
                                </button>
                            </div>

                            <div className="cartItemVariant">
                                {
                                    merchandise.product.variants.edges.length > 1 ? (
                                        <button onClick={(() => { handleModals(modalOptions.variant) })} className='variantChangeButton'>
                                             {currentVariant}
                                            <MdArrowDropDown />
                                        </button>
                                    ) : (

                                        <div>
                                            Variant <span className='singleVariantItem'>{currentVariant} </span> 
                                        </div>
                                    )
                                }

                                {/* {selectedVariant} */}
                            </div>

                        </div>

                        <div className="totalItemLineCost">
                            Total : <span className='totalAmount'>&#8377; {Math.ceil(cost.totalAmount.amount)} </span>  
                        </div>
                        <Modal isOpen={isOpen} setIsOpen={setIsOpen} type={type}  >

                            {
                                type === modalOptions.quantity ? (
                                    <SelectorButtons type={type} setIsOpen={setIsOpen} limit={quantityLimitArr} selectedValue={selectedQuantity} updateValue={updateSelectedOptions} />
                                ) : (
                                    // 
                                    <div>
                                        <SelectorButtons type={type} setIsOpen={setIsOpen} limit={lineItemVariants} selectedValue={selectedVariant} updateValue={updateSelectedOptions} />
                                    </div>
                                )
                            }
                        </Modal>
                    </div>

                </div>

                <div  onClick={()=>{deleteCartItem(id)}} className="deleteButton">
                    <MdDelete />
                </div>

            </div>

        </>
    )
}

export default CartLineItem