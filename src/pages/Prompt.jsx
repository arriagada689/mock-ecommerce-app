import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoLogIn } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

const Prompt = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1)
    }
    
    return (
        <div className='container mx-auto flex flex-col items-center mt-10 md:w-fit'>
            <button onClick={goBack} className='flex items-center space-x-2 md:self-start'>
                <FaArrowLeft />
                <div>Go Back</div>
            </button>
            <IoLogIn size={150}/>
            <div className='text-3xl font-bold text-center'>You must <Link to={'/login'} className='text-blue-700 hover:underline'>log in</Link> or <Link className='text-blue-700 hover:underline'>sign up</Link> to use this feature.</div>
            <div className='flex space-x-12 mt-7'>
                <Link to='/login' className='bg-blue-700 hover:bg-blue-600 w-fit text-white py-2 px-3 rounded'>Login</Link>
                <Link to='/signup' className='border border-gray-300 w-fit py-2 px-3 rounded'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Prompt