const express = require('express');

const covidController = require('../controllers/covid');

const router = express.Router();
const isLogin = require('../middleware/isLogin');

router.get('/thong-tin-covid', isLogin, covidController.getCovid);

router.post('/post-covid', isLogin, covidController.postCovid);

router.get('/covid/:staffId', covidController.getCovidDetail);

module.exports = router;
