import React from 'react'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const UpdateUsername = () => {
    const userInfoString = localStorage.getItem('userInfo');
    const userInfoObject = JSON.parse(userInfoString);
    const [username, setUsername] = useState(userInfoObject.username)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { registerUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${apiBaseUrl}/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfoObject.token}`
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirm_password: confirmPassword
            })
        })
        if (response.ok) {
            const data = await response.json()
            registerUser(data)
            navigate('/profile')
        } else {
            const error = await response.json()
            setErrorMessage(error.message)
        }
    }
    
    return (
        <div className='flex flex-col items-center p-3'>
            <div className='flex flex-col space-y-3 p-2 md:py-10 md:px-10 border border-gray-500 rounded mt-5 md:mt-10'>
                <div className='text-2xl font-bold text-center'>Update Profile</div>
                {errorMessage && <div className='border-2 border-red-800 bg-red-300 p-1 px-2 w-fit text-red-600'>{errorMessage}</div>}
                <Form onSubmit={ submitHandler }>
                    <div className='flex flex-col space-y-2 mb-2'>
                        <label htmlFor="username">New username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username" 
                            required
                            className='border border-gray-400 p-1 w-full md:w-[450px] dark:bg-neutral-900'
                        />
                        <div className='text-xs'>Username must be 150 characters or fewer and contain only letters, digits and @/./+/-/_.</div>
                    </div>
                    <div className='flex flex-col space-y-2 mb-2'>
                        <label htmlFor="password">New password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className='border border-gray-400 p-1 w-full md:w-[450px] dark:bg-neutral-900'
                        />
                    </div>
                    <div className='text-xs'>Password must be at least 4 characters long.</div>
                    <div className='flex flex-col space-y-2 mb-4'>
                        <label htmlFor="password">Confirm new password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                            className='border border-gray-400 p-1 w-full md:w-[450px] dark:bg-neutral-900'
                        />
                    </div>
                    <button type="submit" className='bg-blue-700 hover:bg-blue-600 w-fit text-white py-2 px-3 rounded mb-4'>Update</button>
                </Form>
            </div>
        </div>
    )
}

export default UpdateUsername