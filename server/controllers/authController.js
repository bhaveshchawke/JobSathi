const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route   POST /api/auth/register
// @desc    Register user and create session
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create Session
        req.session.user = { id: user.id, role: user.role };
        res.json({ msg: 'Registered successfully', user: req.session.user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & create session
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`Login attempt for: ${email}`);
        let user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match result: ${isMatch}`);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create Session
        req.session.user = { id: user.id, role: user.role };
        res.json({ msg: 'Logged in successfully', user: req.session.user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST /api/auth/logout
// @desc    Destroy session
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Could not log out');
        res.clearCookie('connect.sid');
        res.json({ msg: 'Logged out' });
    });
};

// @route   GET /api/auth/me
// @desc    Check if user is logged in
exports.getMe = (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
};
