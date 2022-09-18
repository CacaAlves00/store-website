import { createContext, ReactNode, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import useLocalStorage from '../hooks/useLocalStorage'

interface ShoppingCarContext {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[],
}

const ShoppingCartContext = createContext({} as ShoppingCarContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

interface ShoppingCartProviderProps {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const [cartItems, setCartItems] = 
        useLocalStorage<CartItem[]>('shopping-cart', [])

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = (): void => setIsOpen(true)
    const closeCart = (): void => setIsOpen(false)

    function getItemQuantity(id: number): number {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number): void {
        setCartItems((state: CartItem[]) => {
            if (state.find(item => item.id === id) == null) {
                return [...state, { id, quantity: 1 }]
            } else {
                return state.map(item => {
                    if (item.id === id)
                        return { ...item, quantity: item.quantity + 1 }
                    else
                        return item
                })
            }
        })
    }

    function decreaseCartQuantity(id: number): void {
        setCartItems((state: CartItem[]) => {
            if (state.find(item => item.id === id)?.quantity === 1) {
                return state.filter(item => item.id !== id)
            } else {
                return state.map(item => {
                    if (item.id === id)
                        return { ...item, quantity: item.quantity - 1 }
                    else
                        return item
                })
            }
        })
    }

    function removeFromCart(id: number): void {
        setCartItems((state: CartItem[]) => {
            return state.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
    }}>
        {children}

        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}