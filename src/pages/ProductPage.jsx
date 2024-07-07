import React from 'react'
import { useState, useEffect,useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'

const ProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [favorite, setFavorite] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [cartClick, setCartClick] = useState(false)
    const [imgClass, setImgClass] = useState('');
    const { updateNavbar } = useContext(AuthContext)

    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        //get product data
        const fetchProduct = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                setProduct(data)
            } else {
                navigate('/404', { replace: true })
            }
        }
        fetchProduct()
        
    }, [id])

    useEffect(() => {
        //if user is logged in, check if product is favorited
        if (localStorage.userInfo && product){
            const getFavoriteStatus = async () => {
                
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
                const response = await fetch(`${apiBaseUrl}/profile/favorite?productId=${product._id}`, {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userInfo.token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setFavorite(data.favoriteStatus)
                }
            }
            getFavoriteStatus()
        }
    }, [product])

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleCartClick = async (e) => {
        e.preventDefault()
        
        try{
            
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/profile/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo ? userInfo.token : ''}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: quantity
                })
            })
            if (response.ok) {
                const data = await response.json()
                setCartClick(true)
                updateNavbar(data.cartTotal)
            } else {
                const error = await response.json()
                // console.log(error)
                if(error.message === 'Not authorized, no token' || error.message === 'Not authorized, invalid token') {
                    navigate('/prompt')
                } else if(error.message === 'No more than 10 quantity per item') {
                    setErrorMessage(error.message)
                }
            }
        } catch (error){
            console.error(error)
        }
    }

    const handleFavoriteClick = async (e) => {
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/profile/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo ? userInfo.token : ''}`
                },
                body: JSON.stringify({
                    productId: product._id
                })
            })
            if (response.ok){
                const data = await response.json()
                setFavorite(data.status)
            } else {
                const error = await response.json()
                // console.log(error)
                navigate('/prompt')
            }
        } catch (error) {
            console.error(error)
        }   
    }

    const goBack = () => {
        setCartClick(false)
    }

    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        if (naturalWidth > naturalHeight) {
            setImgClass('mx-auto w-[400px] h-[250px] md:w-[650px] md:h-[450px] border-2 border-gray-500 rounded');
        } else {
            setImgClass('mx-auto w-[250px] h-[400px] md:w-[450px] md:h-[650px] border-2 border-gray-500 rounded');
        }
    };
  
    return (
    <>
        {product && !cartClick &&
            <div className='container flex flex-col md:flex-row mx-auto mt-5 md:space-x-3 mb-8'>
                <img src={product.image} alt={ product.title } onLoad={handleImageLoad} className={imgClass}/>

                <div className='flex flex-col space-y-4 px-2'>
                    <div>{ capitalizeWords(product.category) }</div>
                    <div className='text-center text-2xl'>{ product.title }</div>
                    <div className='text-center md:text-left'>{ product.description }</div>
                    <div className='text-red-500 text-2xl text-center md:text-left'>${ product.price.toFixed(2) }</div>
                    <div className='flex mx-auto md:mx-0'>
                        <Rating style={{ maxWidth: 100 }} value={product.rating.rate} readOnly={true}/>
                        <div className='ml-1 self-baseline'>{ product.rating.rate } ({product.rating.count})</div>
                    </div>
                    <div className='flex mx-auto md:mx-0'>
                        <div>Quantity:</div>
                        <select name="quantity" id="quantity" value={quantity || 1} onChange={handleQuantityChange} className='border ml-2 w-fit dark:bg-neutral-900'>
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
                    
                    {errorMessage && <div className='border-2 border-red-800 bg-red-300 p-1 px-2 w-fit text-red-600 mx-auto md:mx-0'>{ errorMessage }</div>}

                    <div className='flex space-x-5 mx-auto md:mx-0'>
                        <button onClick={handleCartClick} className='bg-blue-700 hover:bg-blue-600 w-fit text-white py-2 px-3 rounded'>Add To Cart</button>
                        {favorite ? <button onClick={handleFavoriteClick} className='flex items-center border border-gray-300 w-fit py-2 px-3 rounded'><FaHeart/> <span className='ml-1'>Favorite</span></button> : 
                        <button onClick={handleFavoriteClick} className='flex items-center border border-gray-300 w-fit py-2 px-3 rounded'><FaRegHeart/> <span className='ml-1'>Favorite</span></button>}
                    </div>
                </div>
            </div>
        }
        {product && cartClick && 
            <div className='container mx-auto flex flex-col items-center mt-10 md:w-1/3'>
                <button onClick={goBack} className='flex items-center space-x-2 md:self-start'>
                    <FaArrowLeft />
                    <div>Go Back</div>
                </button>
                <BsCartCheckFill size={150}/>
                <div className='text-3xl font-bold text-center'>Added to cart</div>
                <div className='flex space-x-12 mt-7'>
                    <Link to='/cart' className='bg-blue-700 w-fit text-white py-2 px-3 rounded'>Go to Cart</Link>
                    <Link to='/' className='border border-gray-300 w-fit py-2 px-3 rounded'>Keep Shopping</Link>
                </div>
            </div>
        }
    </>
  )
}

function capitalizeWords(inputString) {
    return inputString
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(' ')
}

export default ProductPage