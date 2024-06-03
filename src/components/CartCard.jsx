import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

const CartCard = ({ product, setUpdate }) => {
    const [quantity, setQuantity] = useState(product.quantity)
    const { updateNavbar } = useContext(AuthContext)

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const removeFromCart = async (e) => {
        e.preventDefault()
        
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${apiBaseUrl}/profile/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({
                productId: product.product._id
            })
        })
        if (response.ok){
            const data = await response.json()
            setUpdate(prev => prev + 1)
            updateNavbar(data.cartTotal)
        } else {
            const error = await response.json()
            // console.error(error)
        }
    }

    const handleQuantityChange = async (e) => {
        setQuantity(e.target.value)
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${apiBaseUrl}/profile/update_quantity`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({
                productId: product.product._id,
                quantity: e.target.value
            })
        })
        if (response.ok) {
            const data = await response.json()
            // console.log(data)
            setUpdate(prev => prev + 1)
            updateNavbar(data.cartTotal)
        }
    }

    return (
        <div className='bg-white p-2 flex space-x-3'>
            <Link to={`/product/${product.product.id}`}>
                <img src={product.product.image} alt={product.product.title} className='w-[90px] h-[90px]'/>
            </Link>

            <div className='w-full flex flex-col space-y-1'>
                <Link to={`/product/${product.product.id}`} className=''>{product.product.title}</Link>
                <div>Price: <span className='text-red-500'>${product.subtotal.toFixed(2)}</span></div>
                    <div className='flex'>
                        <div className='flex'>
                            <div>Quantity:</div>
                            <select className='border w-fit ml-1' name="quantity" id="quantity" value={quantity} onChange={handleQuantityChange}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>

                        <button className='flex items-center border w-fit px-2 ml-6' onClick={removeFromCart}><FaRegTrashAlt /> <div className='ml-1'>Remove Item</div></button>
                    </div>
            </div>
        </div>
    )
}

export default CartCard