const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();
const isLogin = require('../middleware/isManger');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/kich-hoat', isLogin, authController.getNewStart);

router.post('/kich-hoat', isLogin, authController.postNewStart);

module.exports = router;
