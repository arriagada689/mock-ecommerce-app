import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { IoIosWarning } from "react-icons/io";

const ConfirmDelete = () => {
    const navigate = useNavigate();
    const { deleteProfile } = useContext(AuthContext)

    const goBack = () => {
        navigate(-1)
    }
    
    const handleDeleteProfile = async () => {
        const response = await fetch('/api/profile/delete_profile', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            deleteProfile()
            navigate('/')
        }
    }

    return (
        <div className='flex flex-col items-center mt-16'>
            <IoIosWarning className='text-red-600' size={150}/>
            <div className='text-3xl font-bold text-center'>Are you sure you want to delete your account?</div>
            <div className='flex space-x-12 mt-7'>
                <button className='bg-red-600 w-fit text-white py-2 px-3 rounded' onClick={handleDeleteProfile}>Confirm Delete</button>
                <button className='border border-gray-300 w-fit py-2 px-3 rounded' onClick={goBack}>Go Back To Profile</button>
            </div>
        </div>
    )
}

export default ConfirmDelete