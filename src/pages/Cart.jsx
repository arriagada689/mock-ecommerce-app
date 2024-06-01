import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartCard from '../components/CartCard'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(null)
    const [update, setUpdate] = useState(null)
    const { updateNavbar } = useContext(AuthContext)
    const [cartTotal, setCartTotal] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0);

    const navigate = useNavigate();

    useEffect(() => {
        setCartTotal(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0)
    }, [localStorage.getItem('userInfo')])

    useEffect(() => {
        const getCartItems = async () => {
            const response = await fetch('/api/profile/cart', {
                headers: {
                    'Content-Type': 'application/json'
                } 
            })
            if(response.ok) {
                const data = await response.json()
                setCartItems(data.cartItems)
                setTotal(data.total)
            } else {
                const error = await response.json()
                // console.error(error)
            }
        }
        getCartItems()
    }, [update])

    const renderCartCards = () => {
        return cartItems.map((item, index) => (
            <CartCard key={index} product={item} setUpdate={setUpdate}/>
        ))
    }

    const handleOrderClick = async (e) => {
        const response = await fetch('/api/profile/register_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                total: total
            })
        })
        if(response.ok) {
            const data = await response.json()
            updateNavbar(0)
            navigate(`/order_complete/${data._id}`)
        }
    }
  
    return (
        <div className='bg-gray-100 h-screen overflow-auto'>
            <div className='container mx-auto justify-center space-y-3 my-5 p-2 md:p-0 md:space-y-0 md:flex md:space-x-3'>
                <div className='w-full md:w-[700px] xl:w-[850px]'>
                    <div className='text-2xl text-center mb-2'>Cart ({cartTotal})</div>
                    <div className='space-y-1'>
                        {cartItems.length > 0 ? renderCartCards() : 
                            <div className='bg-white text-center text-xl py-4'>No products in the cart.</div>
                        }
                    </div>
                </div>
                
                <div className='flex flex-col justify-center items-center space-y-2 bg-white p-2 md:w-[180px] xl:w-[200px]'>
                    <IoBagCheckOutline size={50}/>
                    {total > 0 && (
                        <div className='text-lg mb-4 w-full flex justify-between'>
                            <div>Total:</div>
                            <div><span className='text-red-500'>${total}</span></div>
                        </div>
                    )}
                    {total > 0 ? 
                        <button 
                            onClick={handleOrderClick} 
                            className='bg-blue-700 w-full text-center text-white py-2 px-3 rounded'>
                            Complete Order
                        </button> : 
                        <Link className='cursor-not-allowed bg-blue-700 w-full text-center text-white py-2 px-3 rounded'>Complete Order</Link>}
                    <Link to='/' className='border border-gray-300 w-full text-center py-2 px-3 rounded'>Keep Shopping</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart