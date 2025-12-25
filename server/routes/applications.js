const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const auth = require('../middleware/auth');

router.post('/apply', auth, appController.applyForJob);
router.put('/:id/status', auth, appController.updateApplicationStatus);
router.get('/:id/check-chat', auth, appController.checkChatAccess);

module.exports = router;
