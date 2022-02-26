const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// xác nhận cho làm việc
router.get('/xac-nhan-lam-viec', shopController.getConfirmCheckIn);

router.get('/xac-nhan-ket-thuc-lam', shopController.getConfirmCheckOut);

router.post('/check-in', shopController.postCheckIn);

router.get('/check-out', shopController.getCheckout);

router.post('/check-out', shopController.postCheckOut);

router.get('/thong-tin-ca-nhan', shopController.getInfStaff);

router.get('/edit-staff', shopController.getEditStaff);

router.post('/edit-staff', shopController.postEditStaff);

module.exports = router;
