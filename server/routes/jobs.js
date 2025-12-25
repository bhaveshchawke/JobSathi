const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, jobController.postJob); // Protected: Employer only (ideally check role too)
router.get('/', jobController.getJobs); // Public
router.get('/my-jobs', auth, jobController.getMyJobs); // Protected

module.exports = router;
