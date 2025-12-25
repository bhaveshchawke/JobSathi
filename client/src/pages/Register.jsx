
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'seeker' // Default role
    });
    const navigate = useNavigate();
    const { checkUserLoggedIn } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            // POST request to backend register endpoint
            const res = await axios.post('/api/auth/register', formData);

            if (res.status === 200) {
                await checkUserLoggedIn(); // Update global state
                alert('Registration Successful! You are strictly logged in.');
                navigate('/jobs'); // Redirect to Jobs page
            }
        } catch (err) {
            console.error(err);
            alert('Registration Failed: ' + (err.response?.data?.msg || 'Server Error'));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

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

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">I am a:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="seeker">Job Seeker (Student/Worker)</option>
                        <option value="employer">Employer (Shopkeeper/Business)</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                    Register
                </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
                Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
