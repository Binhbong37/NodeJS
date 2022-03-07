const express = require('express');

const gioLamController = require('../controllers/tonghopgiolam');

const router = express.Router();
const isLogin = require('../middleware/isLogin');

router.get('/thong-tin-gio-lam', isLogin, gioLamController.getTongHopGioLam);

router.post('/thong-tin-gio-lam', gioLamController.getTongHopGioLam);

router.get('/tong-hop-gio-lam', isLogin, gioLamController.getTongHop);

router.post('/xac-nhan-quan-ly', gioLamController.postManager);

router.post('/delete-worktime', isLogin, gioLamController.postDeleteWorkTime);

module.exports = router;
