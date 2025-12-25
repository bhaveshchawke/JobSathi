const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    seeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Application Status Tracking
    status: {
        type: String,
        enum: ['applied', 'viewed', 'shortlisted', 'rejected'],
        default: 'applied'
    },

    // Conditional Logic: Chat is LOCKED by default.
    // It UNLOCKS only when status becomes 'shortlisted'.
    isChatUnlocked: {
        type: Boolean,
        default: false
    },

    appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Pre-save hook to auto-unlock chat if status is shortlisted
applicationSchema.pre('save', function (next) {
    if (this.status === 'shortlisted') {
        this.isChatUnlocked = true;
    } else {
        // Optional: Re-lock if status changes back? 
        // Usually once unlocked, it stays unlocked, but let's stick to the rule "Only when clicked Select/Shortlist".
        // If moved to rejected, maybe lock it? Let's keep it simple: Shortlisted = Unlocked.
        this.isChatUnlocked = false;
    }
    next();
});

module.exports = mongoose.model('Application', applicationSchema);
