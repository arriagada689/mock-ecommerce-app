import React, { useEffect } from 'react'
import { useState } from 'react'
import FavoriteCard from '../components/FavoriteCard.jsx'
import OrderCard from '../components/OrderCard.jsx'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [favorites, setFavorites] = useState(null)
    const [orders, setOrders] = useState(null)
    const [update, setUpdate] = useState(1)

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        const getFavorites = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/profile/get_favorites`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
            })
            if(response.ok) {
                const data = await response.json()
                setFavorites(data)
            } else {
                console.error(await response.json())
            }
        }
        getFavorites()
    }, [update])

    useEffect(() => {
        const getOrders = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/profile/get_orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
            })
            if(response.ok) {
                const data = await response.json()
                setOrders(data)
            } else {
                console.error(await response.json())
            }
        }
        getOrders()
    }, [])

    const renderFavorites = () => {
        if (favorites.length === 0){
            return <div className='text-center bg-white px-10 py-3'>No favorite products to display</div>
        }
        return favorites.map((product, index) => {
            return <FavoriteCard key={index} product={product} setUpdate={setUpdate}/>
        })
    }

    const renderOrders = () => {
        if (orders.length === 0) {
            return <div className='text-center bg-white py-3'>No orders to display</div>
        }
        return orders.map((order, index) => {
            return <OrderCard key={index} order={order}/>
        })
    }

    return (
        <div className='bg-gray-100 h-screen'>
            <div className='container mx-auto my-5 justify-center'>
                <div className='flex justify-center items-center text-center space-x-5'>
                    <div className='text-lg'>{userInfo.username}'s profile</div>
                    <Link to='/update_profile' className='bg-blue-700 w-fit text-white py-2 px-3 rounded'>Update Profile</Link>
                    <Link to='/confirm_delete' className='bg-red-600 w-fit text-white py-2 px-3 rounded'>Delete Profile</Link>
                </div>

                <div className=' border-b-2 border-gray-300 my-4'></div>

                <div className='flex flex-col md:flex-row justify-center md:space-x-3'>
                    <div className='space-y-1 p-2 md:p-0'>
                        <div className='text-2xl text-center mb-2'>Favorites</div>
                        {favorites && renderFavorites()}
                    </div>

                    <div className='space-y-1 w-[310px] mx-auto'>
                        <div className='text-2xl text-center mb-2'>Order History</div>
                        {orders && renderOrders()}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
