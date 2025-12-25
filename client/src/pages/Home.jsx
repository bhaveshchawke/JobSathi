import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Betul Jobs</h1>
            <p className="text-xl text-gray-600 mb-8">Connecting Local Talent with Local Businesses in Betul.</p>

            <div className="space-x-4">
                <Link to="/jobs" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Browse Jobs
                </Link>
                <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                    Post a Job
                </Link>
            </div>
        </div>
    );
};

export default Home;
