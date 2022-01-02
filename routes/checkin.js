const express = require('express');

const checkInController = require('../controllers/checkin');


const router = express.Router();

router.post('/check-in', checkInController.postCheckIn);

// router.get('/signup', authController.getSignup);



module.exports = router;
