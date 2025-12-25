const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * @desc    Apply for a Job
 * @route   POST /api/applications/apply
 * @access  Private (Seeker)
 */
exports.applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const seekerId = req.user.id; // Assuming auth middleware adds user to req

        // 1. Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // 2. Check if already applied
        const existingApp = await Application.findOne({ job: jobId, seeker: seekerId });
        if (existingApp) {
            return res.status(400).json({ msg: 'You have already applied for this job' });
        }

        // 3. Create Application
        const newApplication = new Application({
            job: jobId,
            seeker: seekerId,
            status: 'applied', // Default status
            isChatUnlocked: false // Default locked
        });

        await newApplication.save();
        res.status(201).json(newApplication);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Update Application Status (Employer Only)
 * @route   PUT /api/applications/:id/status
 * @access  Private (Employer)
 */
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body; // 'shortlisted', 'rejected', 'viewed'
        const appId = req.params.id;

        let application = await Application.findById(appId);
        if (!application) {
            return res.status(404).json({ msg: 'Application not found' });
        }

        // Verify that the logged-in user is the owner of the job
        // (This usually requires populating the job and checking createdBy)
        // For simplicity here, assuming middleware/logic handles ownership check.

        // Update Status
        application.status = status;

        // The Logic for Unlocking Chat is handled in the Model Pre-save, 
        // OR we can explicitly enforce it here for clarity.
        if (status === 'shortlisted') {
            application.isChatUnlocked = true;
        } else {
            application.isChatUnlocked = false;
        }

        await application.save();

        res.json({
            msg: `Application marked as ${status}`,
            chatUnlocked: application.isChatUnlocked,
            application
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Check Chat Access
 * @route   GET /api/applications/:id/check-chat
 */
exports.checkChatAccess = async (req, res) => {
    try {
        const appId = req.params.id;
        const application = await Application.findById(appId);

        if (!application) return res.status(404).json({ msg: 'App not found' });

        if (application.isChatUnlocked) {
            return res.json({ canChat: true });
        } else {
            return res.status(403).json({ canChat: false, msg: 'Chat is locked until shortlisted.' });
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
