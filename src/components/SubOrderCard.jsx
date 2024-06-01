import React from 'react'

const SubOrderCard = ({ item, quantity }) => {
    return (
        <div className='border p-1'>
            <div className='line-clamp-1'>{item.title}</div>
            <div>quantity: {quantity}</div>
        </div>
    )
}

export default SubOrderCard