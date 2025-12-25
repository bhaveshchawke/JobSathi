module.exports = function (req, res, next) {
    // Check if session exists and has a user
    if (req.session && req.session.user) {
        req.user = req.session.user; // Attach user to req object for controllers
        return next();
    } else {
        return res.status(401).json({ msg: 'Unauthorized: Please log in' });
    }
};
