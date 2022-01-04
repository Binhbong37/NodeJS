const express = require('express');

const onLeaveController = require('../controllers/onLeave');

const router = express.Router();

router.get('/xin-nghi-phep', onLeaveController.getOnLeave);

router.post('/xin-nghi-phep', onLeaveController.postOnLeave);

module.exports = router;
