import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'

const ProductCard = ({ product }) => {

    return (
        <div className='border border-gray-400 md:border-none md:w-60 hover:shadow-lg'>
            <Link to={`/product/${product.id}`} className=''>
                <img src={product.image} alt={product.title} className='h-40 mx-auto'/>
                <div className='p-2'>
                    <div className='flex items-center'>
                        <Rating style={{ maxWidth: 85 }} value={product.rating.rate} readOnly={true}/>
                        <div className='ml-1'>({product.rating.count})</div>
                    </div>
                    <div className='h-[50px] line-clamp-2'>{product.title}</div>
                    <div>${product.price.toFixed(2)}</div>
                </div>
                
            </Link>
        </div>
    )
}

export default ProductCard