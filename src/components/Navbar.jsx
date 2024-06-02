import { NavLink, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { RiShoppingCart2Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const linkClass = ({ isActive }) => isActive ? "hover:text-gray-600" : "hover:text-gray-600"
    const { isLoggedIn } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext)
    const [cartTotal, setCartTotal] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0);
    
    const navigate = useNavigate();

    useEffect(() => {
        setCartTotal(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).cartTotal : 0)
    }, [localStorage.getItem('userInfo')])

    const logoutHandler = async (e) => {
        e.preventDefault();
        
        // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        // const response = await fetch(`${apiBaseUrl}/users/logout`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // })
        // const data = await response.json()
        // if (response.ok) {
        //     logoutUser()
        //     navigate('/')
        // }
        logoutUser()
    }

    return (
    <div className='border-b-2 border-gray-400'>
        <nav className="container mx-auto text-black p-4">
            <div className="flex items-center justify-between">
                
                <NavLink to='/' className="text-2xl">Mock E-Commerce App</NavLink>
            
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                        <NavLink to="/profile" className="hover:text-gray-600">Profile</NavLink>
                        <NavLink to="/cart" className="flex items-center space-x-2 hover:text-gray-600"><RiShoppingCart2Line size={24}/>{cartTotal}</NavLink>
                        <NavLink onClick={(e) => logoutHandler(e)} className="hover:text-gray-600">Log Out</NavLink>
                        </>
                    ) : <>
                        <NavLink to="/login" className="hover:text-gray-600">Login</NavLink>
                        <NavLink to="/signup" className="hover:text-gray-600">Sign Up</NavLink>
                        </>}
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(prev => !prev)}>
                <GiHamburgerMenu />
                </button>
            </div>
            {isOpen && isLoggedIn && 
                <div className="md:hidden flex flex-col space-y-2 mt-2">
                    <NavLink to="/profile" className="" onClick={() => setIsOpen(false)}>Profile</NavLink>
                    <NavLink to="/cart" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}><RiShoppingCart2Line size={24}/>{cartTotal}</NavLink>
                    <NavLink onClick={(e) => {logoutHandler(e), setIsOpen(false)}} className="hover:text-gray-600 bg-transparent" >Log Out</NavLink>
                </div> }
            {isOpen && !isLoggedIn &&
                <div className="md:hidden flex flex-col space-y-2 mt-2">
                    <NavLink to="/login" className="" onClick={() => setIsOpen(false)}>Login</NavLink>
                    <NavLink to="/signup" className="" onClick={() => setIsOpen(false)}>Sign Up</NavLink>
                </div>
            }
        </nav>
    </div>
  )
}

export default Navbar