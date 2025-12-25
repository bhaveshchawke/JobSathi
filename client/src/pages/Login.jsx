
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { checkUserLoggedIn } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // By default axios doesn't send cookies. We must enable withCredentials: true
            // However, since we are using proxy in Vite, it forwards everything.
            // But explicit config is safer if we change deployment later.
            const res = await axios.post('/api/auth/login', formData); // Use relative path via proxy

            if (res.status === 200) {
                await checkUserLoggedIn(); // Update global state
                alert('Login Successful!');
                navigate('/jobs');
            }
        } catch (err) {
            console.error(err);
            alert('Login Failed: ' + (err.response?.data?.msg || 'Server Error'));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login to Betul Jobs</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
