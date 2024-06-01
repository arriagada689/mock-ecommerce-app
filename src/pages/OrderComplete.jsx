import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { BiShoppingBag } from "react-icons/bi";

const OrderComplete = () => {
    const { id } = useParams()
    
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center border p-5 md:py-10 md:px-10 border-gray-500 rounded mt-10'>
                <BiShoppingBag size={150}/>
                <div className='text-3xl font-bold text-center'>Order Complete</div>
                <div className='text-xl'>order no: <span className='text-green-600'>{id ? id : ''}</span></div>
                <div className='text-xl'>Check your order history in your profile</div>
                <div className='flex space-x-12 mt-7'>
                    <Link to='/' className='bg-blue-700 w-fit text-white py-2 px-3 rounded'>Keep Shopping</Link>
                    <Link to='/profile' className='border border-gray-300 w-fit py-2 px-3 rounded'>View Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderComplete