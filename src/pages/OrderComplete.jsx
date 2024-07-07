import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BiShoppingBag } from "react-icons/bi";

const OrderComplete = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        if(!id) return
        const getSingleOrder = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/profile/get_single_order/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },

            })
            if(response.ok) {
                const data = await response.json()
                setOrder(data)
            }
        }
        getSingleOrder()
    }, [id])
    
    return (
        <div className='flex flex-col items-center space-y-3'>
            <div className='flex flex-col items-center border p-5 md:py-10 md:px-10 border-gray-500 rounded mt-10 dark:bg-neutral-800'>
                <BiShoppingBag size={150}/>
                <div className='text-3xl font-bold text-center'>Order Complete</div>
                <div className='text-xl'>order no: <span className='text-green-600'>{id ? id : ''}</span></div>
                <div className='text-xl'>Check your order history in your profile</div>
                <div className='flex space-x-12 mt-7'>
                    <Link to='/' className='bg-blue-700 w-fit text-white py-2 px-3 rounded'>Keep Shopping</Link>
                    <Link to='/profile' className='border border-gray-300 w-fit py-2 px-3 rounded'>View Profile</Link>
                </div>
            </div>

            {/* Grid goes here */}
            <div className='text-2xl font-bold'>Order Summary</div>
            {order && 
                <div className='grid grid-cols-3 gap-4 w-2/3 p-5 border border-gray-500 dark:bg-neutral-800'>
                    <div className='font-bold text-center'>Product</div>
                    <div className='font-bold text-center'>Unit Price</div>
                    <div className='font-bold text-center'>Quantity</div>
                    {order.products.map((product, index) => (
                        <React.Fragment key={index}>
                            <div className='text-center line-clamp-1'>{product.title}</div>
                            <div className='text-center'>{product.price.toFixed(2)}</div>
                            <div className='text-center'>{product.quantity}</div>
                        </React.Fragment>
                    ))}
                </div>
            }
            {order && <div className='text-lg'>Total: <span className='text-red-500'>${order.order.total.toFixed(2)}</span></div>}
        </div>
    )
}

export default OrderComplete