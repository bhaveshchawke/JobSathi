import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Betul Areas for Filter
const BETUL_LOCATIONS = [
    'All',
    'Ganj',
    'Kothi Bazar',
    'Sadar',
    'Padhar',
    'Civil Lines',
    'Other'
];

const JobFeed = () => {
    const [jobs, setJobs] = useState([]);
    const [filterLocation, setFilterLocation] = useState('All');
    const [loading, setLoading] = useState(true);

    // Fetch Jobs (Simulated API Call)
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                // const res = await axios.get('/api/jobs'); 
                // setJobs(res.data);

                // Mock Data for Demo
                const mockJobs = [
                    { _id: '1', title: 'Sales Executive', company: 'Sharma Kirana', location: 'Ganj', salary: '8000 PM', category: 'Sales' },
                    { _id: '2', title: 'Computer Operator', company: 'Betul Tech', location: 'Civil Lines', salary: '10000 PM', category: 'Tech' },
                    { _id: '3', title: 'Helper', company: 'Gupta Medical', location: 'Kothi Bazar', salary: '6000 PM', category: 'Helper' },
                ];
                setJobs(mockJobs);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching jobs", err);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Filter Logic
    const filteredJobs = filterLocation === 'All'
        ? jobs
        : jobs.filter(job => job.location === filterLocation);

    const handleApply = async (jobId) => {
        // Call Apply API
        alert(`Applying to job ${jobId}... (API Call logic here)`);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Betul Job Portal</h1>

            {/* Location Filter */}
            <div className="mb-8 flex justify-center">
                <label className="mr-4 font-semibold text-lg items-center flex">
                    Filter by Area:
                </label>
                <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {BETUL_LOCATIONS.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* content */}
            {loading ? (
                <p className="text-center">Loading jobs...</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                                <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                                <p className="text-gray-600 font-medium">{job.company}</p>

                                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded">📍 {job.location}</span>
                                    <span className="text-green-600 font-bold">₹ {job.salary}</span>
                                </div>

                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Category: {job.category}</span>
                                    <button
                                        onClick={() => handleApply(job._id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-2 text-gray-500">No jobs found in this area.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobFeed;
