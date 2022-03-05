const express = require('express');

const onLeaveController = require('../controllers/onLeave');

const router = express.Router();
const isLogin = require('../middleware/isLogin');

router.get('/xin-nghi-phep', isLogin, onLeaveController.getOnLeave);

router.post('/xin-nghi-phep', onLeaveController.postOnLeave);

module.exports = router;
