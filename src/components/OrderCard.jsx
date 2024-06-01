import React, { useState } from 'react'
import SubOrderCard from './SubOrderCard';

const OrderCard = ({ order }) => {
    const rawDate = new Date(order.order.createdAt);
    const formattedDate = rawDate.toLocaleDateString();
    const [seeMore, setSeeMore] = useState(false)

    const handleSeeMoreClick = () => {
        setSeeMore(prev => !prev)
    }

    const renderProducts = () => {
        return order.products.map((item, index) => {
            return <SubOrderCard key={index} item={item} quantity={order.order.products[index].quantity}/>
        })
    }

    return (
        <div className='bg-white p-2'>
            <div>order no: <span className='text-green-500'>{order.order._id}</span></div>
            <div>total: <span className='text-red-500'>${order.order.total}</span></div>
            <div>date: {formattedDate}</div>
            {!seeMore ? <button onClick={handleSeeMoreClick} className='text-blue-600 underline'>See More</button> : 
                <div><button onClick={handleSeeMoreClick} className='text-blue-600 underline'>Close</button> {renderProducts()}</div> }
            
        </div>
    )
}

export default OrderCard