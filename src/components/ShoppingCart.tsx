import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCarContext'
import formatCurrency from '../utilities/formatCurrency'
import CartItem from './CartItem'
import storeItems from './../data/items.json'

interface ShoppingCartProps {
    isOpen: boolean
}

function ShoppingCart({ isOpen }: ShoppingCartProps) {

    const { closeCart, cartItems } = useShoppingCart()

    return (
        <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}

                <div className='ms-auto fw-bold fs-5'>
                    Total {formatCurrency(
                        cartItems.reduce((total, element) => {
                            const item = storeItems.find(i => i.id === element.id)
                            return total + element.quantity * (item?.price || 0)
                        },
                            0))
                    }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart