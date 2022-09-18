import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCarContext'
import formatCurrency from '../utilities/formatCurrency'

interface StoreItemProps {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {

    const { getItemQuantity, increaseCartQuantity,
        decreaseCartQuantity, removeFromCart } = useShoppingCart()

    const itemQuantity = getItemQuantity(id)

    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={imgUrl}
                height='200px' style={{ objectFit: 'cover' }} />

            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between
                align-items-baseline mb-4'>
                    <span className='fs-3'> {/* fs == font-size */}
                        {name}
                    </span>
                    <span className='ms-2 text-muted'> {/* ms == margin-start */}
                        {formatCurrency(price)}
                    </span>
                </Card.Title>

                <div className='mt-auto'>
                    {
                        itemQuantity === 0 ? (
                            <Button className='w-100'
                                onClick={() => increaseCartQuantity(id)}>
                                Add to card
                            </Button>
                        ) : (
                            <div className='d-flex align-items-center
                            flex-column' style={{ gap: '.5rem' }}>
                                <div className='d-flex align-items-center
                                justify-content-center' style={{ gap: '.5rem' }}>
                                    <Button onClick={() => decreaseCartQuantity(id)}>
                                        -
                                    </Button>
                                    <span className='fs-4'>
                                        {itemQuantity}
                                    </span> in cart
                                    <Button onClick={() => increaseCartQuantity(id)}>
                                        +
                                    </Button>
                                </div>

                                <Button variant='danger' size='sm'
                                onClick={() => removeFromCart(id)}>
                                    Remove
                                </Button>
                            </div>
                        )
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem