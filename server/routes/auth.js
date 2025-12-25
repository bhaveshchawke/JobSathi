const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload } = require('../config/cloudinary');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);

// Route to upload resume/profile pic
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        // File details are in req.file
        res.json({
            msg: 'File Uploaded Successfully',
            url: req.file.path,
            filename: req.file.filename
        });
    } catch (err) {
        res.status(500).send('Upload Error');
    }
});

module.exports = router;
