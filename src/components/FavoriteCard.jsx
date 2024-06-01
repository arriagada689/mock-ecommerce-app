import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegTrashAlt } from "react-icons/fa";

const FavoriteCard = ({ product, setUpdate }) => {
    
    //make image link back to the product
    const removeFavorite = async (e) => {
        try {
            const response = await fetch('/api/profile/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product._id
                })
            })
            if (response.ok){
                const data = await response.json()
                setUpdate(prev => prev + 1)
            }
        } catch (error) {
            console.error(error)
        }   
    }
  
    return (
        <div className='bg-white p-2 flex space-x-3 xl:w-[750px]'>
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className='w-[90px] h-[90px]'/>
            </Link>
            
            <div className='w-full'>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
                <div>Price: <span className='text-red-500'>${ product.price }</span></div>
                <button onClick={removeFavorite} className='border flex items-center space-x-1'><FaRegTrashAlt/> <div>Remove Favorite</div> </button>
            </div>
        </div>
    )
}

export default FavoriteCard