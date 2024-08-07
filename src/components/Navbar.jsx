import { NavLink, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { RiShoppingCart2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import DarkModeToggle from './DarkModeToggle.jsx';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext)
    const [cartTotal, setCartTotal] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0);
    
    const navigate = useNavigate();

    useEffect(() => {
        setCartTotal(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0)
    }, [localStorage.getItem('userInfo')])

    const logoutHandler = async (e) => {
        e.preventDefault();
        
        logoutUser()
        navigate('/')
    }

    return (
    <div className='border-b-2 border-gray-400'>
        <nav className="container mx-auto text-black dark:text-white p-4">
            <div className="flex items-center justify-between">
                
                <NavLink to='/' onClick={() => setIsOpen(false)} className="text-2xl">Mock E-Commerce App</NavLink>

                {/*Navbar for desktop */}
                <div className="hidden md:flex items-center space-x-4 text-lg">
                    <DarkModeToggle />
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/profile" className={`hover:text-gray-600 px-2 py-1 rounded-lg ${currentPath.includes('profile') ? 'bg-black text-white' : ''}`}>Profile</NavLink>
                            <NavLink to="/cart" className={`flex items-center space-x-2 hover:text-gray-600 px-2 py-1 rounded-lg ${currentPath.includes('cart') ? 'bg-black text-white' : ''}`}><RiShoppingCart2Line size={24}/>{cartTotal}</NavLink>
                            <NavLink onClick={(e) => logoutHandler(e)} className="hover:text-gray-600">Log Out</NavLink>
                        </>
                    ) : <>
                            <NavLink to="/login" className={`hover:text-gray-600 px-2 py-1 rounded-lg ${currentPath.includes('login') ? 'bg-black text-white' : ''}`}>Login</NavLink>
                            <NavLink to="/signup" className={`hover:text-gray-600 px-2 py-1 rounded-lg ${currentPath.includes('signup') ? 'bg-black text-white' : ''}`}>Sign Up</NavLink>
                        </>}
                </div>
                
                <div className='md:hidden flex items-center space-x-4'>
                    <DarkModeToggle />
                    <button onClick={() => setIsOpen(prev => !prev)}>
                        <GiHamburgerMenu size={30}/>
                    </button>
                </div>
            </div>
            {isOpen && isLoggedIn && 
                <div className="md:hidden flex flex-col items-center space-y-2 mt-2">
                    <NavLink to="/profile" className={`px-2 py-1 rounded-lg ${currentPath.includes('profile') ? 'bg-black text-white' : ''}`} onClick={() => setIsOpen(false)}>Profile</NavLink>
                    <NavLink to="/cart" className={`flex items-center space-x-2 px-2 py-1 rounded-lg ${currentPath.includes('cart') ? 'bg-black text-white' : ''}`} onClick={() => setIsOpen(false)}><RiShoppingCart2Line size={24}/>{cartTotal}</NavLink>
                    <NavLink onClick={(e) => {logoutHandler(e), setIsOpen(false)}} className="hover:text-gray-600 bg-transparent" >Log Out</NavLink>
                </div> }
            {isOpen && !isLoggedIn &&
                <div className="md:hidden flex flex-col items-center space-y-2 mt-2">
                    <NavLink to="/login" className={`px-2 py-1 rounded-lg ${currentPath.includes('login') ? 'bg-black text-white' : ''}`} onClick={() => setIsOpen(false)}>Login</NavLink>
                    <NavLink to="/signup" className={`px-2 py-1 rounded-lg ${currentPath.includes('signup') ? 'bg-black text-white' : ''}`} onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                </div>
            }
        </nav>
    </div>
  )
}

export default Navbar