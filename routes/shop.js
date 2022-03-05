const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();
const isLogin = require('../middleware/isLogin');

router.get('/', isLogin, shopController.getIndex);

// xác nhận cho làm việc
router.get('/xac-nhan-lam-viec', isLogin, shopController.getConfirmCheckIn);

router.get(
    '/xac-nhan-ket-thuc-lam',
    isLogin,
    shopController.getConfirmCheckOut
);

router.post('/check-in', shopController.postCheckIn);

router.get('/check-out', isLogin, shopController.getCheckout);

router.post('/check-out', shopController.postCheckOut);

router.get('/thong-tin-ca-nhan', isLogin, shopController.getInfStaff);

router.get('/edit-staff', isLogin, shopController.getEditStaff);

router.post('/edit-staff', shopController.postEditStaff);

module.exports = router;
