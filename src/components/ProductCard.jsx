import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'

const ProductCard = ({ product }) => {

    return (
        <div className='border border-gray-400 md:border-none md:w-60 hover:shadow-lg dark:bg-neutral-800 p-2 dark:rounded-lg dark:hover:bg-neutral-700'>
            <Link to={`/product/${product.id}`} className=''>
                <img src={`../images/${product.id}.jpg`} alt={product.title} className='h-40 mx-auto'/>
                <div className='mt-1'>
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