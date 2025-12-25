const mongoose = require('mongoose');

// Fixed locations for Betul City to ensure hyper-local filtering
const BETUL_LOCATIONS = [
    'Ganj',
    'Kothi Bazar',
    'Sadar',
    'Padhar',
    'Civil Lines',
    'Other'
];

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },

    // Categorization
    category: { type: String, required: true }, // e.g., Sales, Tech, Helper
    salary: { type: String, required: true }, // e.g., "5000-8000 PM"

    // Hyper-local filtering for Betul
    location: {
        type: String,
        enum: BETUL_LOCATIONS,
        required: true,
        default: 'Other'
    },

    // Relationship to the Employer
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Admin approval status
    status: {
        type: String,
        enum: ['pending', 'active', 'closed', 'rejected'],
        default: 'pending' // Jobs require Admin approval by default? Or active? Assuming active for simplicity unless specified otherwise, but User asked for Admin approcal.
    }

}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
