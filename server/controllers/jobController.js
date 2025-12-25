const Job = require('../models/Job');

// @route   POST /api/jobs
// @desc    Post a new job (Employer only)
exports.postJob = async (req, res) => {
    try {
        const { title, description, category, salary, location } = req.body;

        const newJob = new Job({
            title,
            description,
            category,
            salary,
            location,
            createdBy: req.user.id
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/jobs
// @desc    Get all jobs (with optional filters)
exports.getJobs = async (req, res) => {
    try {
        const { location, category } = req.query;
        let query = { status: 'active' }; // Default to showing active jobs

        if (location && location !== 'All') {
            query.location = location;
        }
        if (category && category !== 'All') {
            query.category = category;
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/jobs/my-jobs
// @desc    Get jobs posted by logged in employer
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
