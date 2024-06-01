import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    //Check local storage for userInfo and set isLoggedIn
    useEffect(() => {
        const storedUserData = localStorage.getItem('userInfo');
       
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, []);

    const loginUser = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        setIsLoggedIn(true);
        setUserData(data);
    };

    const logoutUser = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserData({});
    };

    const registerUser = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setIsLoggedIn(true);
        setUserData(data);
    }

    const updateNavbar = (num) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.cartTotal = num
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserData(userInfo)
    }

    const deleteProfile = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserData({});
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, loginUser, logoutUser, registerUser, updateNavbar, deleteProfile }}>
            {children}
        </AuthContext.Provider>
    );
};