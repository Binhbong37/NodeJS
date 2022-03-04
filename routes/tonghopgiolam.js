const express = require('express');

const gioLamController = require('../controllers/tonghopgiolam');

const router = express.Router();

router.get('/thong-tin-gio-lam', gioLamController.getTongHopGioLam);

router.post('/thong-tin-gio-lam', gioLamController.getTongHopGioLam);

router.get('/tong-hop-gio-lam', gioLamController.getTongHop);

router.post('/xac-nhan-quan-ly', gioLamController.postManager);

module.exports = router;
