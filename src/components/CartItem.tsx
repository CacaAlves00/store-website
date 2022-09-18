import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCarContext'
import storeItems from '../data/items.json'
import formatCurrency from '../utilities/formatCurrency'


interface CartItemProps {
    id: number,
    quantity: number
}

function CartItem({ id, quantity }: CartItemProps) {

    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)

    if (item === null) return null

    return (
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center gap-2' >
            <img
                src={item?.imgUrl}
                style={{
                    width: '125px', height: '75px', objectFit: 'cover'
                }} />

            <div className='me-auto'>
                <div>
                    {item?.name}
                    {quantity > 1 &&
                        <span className='text-muted' style={{
                            fontSize: '.65rem', 
                            marginLeft: '0.3vw'
                        }}>
                            x{quantity}
                        </span>}
                </div>

                <div className='text-muted' style={{ fontSize: '.75rem' }}>
                    {formatCurrency(item?.price || 0)}
                </div>
            </div>

            <div>
                {formatCurrency((item?.price || 0) * quantity)}
            </div>
            <Button variant='outline-danger' size='sm' onClick={
                () => removeFromCart(item?.id || -1)
            }>
                &times;
            </Button>
        </Stack>
    )
}

export default CartItem