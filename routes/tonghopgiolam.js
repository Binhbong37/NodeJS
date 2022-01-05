const express = require('express');

const gioLamController = require('../controllers/tonghopgiolam');

const router = express.Router();

router.get('/thong-tin-gio-lam', gioLamController.getTongHopGioLam);

module.exports = router;
