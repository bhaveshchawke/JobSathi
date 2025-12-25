import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on load
    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            if (res.data.isAuthenticated) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Auth check failed", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
