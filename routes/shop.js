const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// xác nhận cho làm việc
router.get('/xac-nhan-lam-viec', shopController.getCheckIn);

router.post('/check-in', shopController.postCheckIn);

router.get('/check-out', shopController.getCheckout);

router.post('/check-out', shopController.postCheckOut);

// router.get('/thong-tin-ca-nhan', shopController.getProducts);

// router.get('/thong-tin-gio-lam', shopController.getCart);

// router.get('/thong-tin-covid', shopController.getOrders);

// Nghỉ phép
// router.get('/xin-nghi-phep', shopController.nghiPhep)

module.exports = router;
