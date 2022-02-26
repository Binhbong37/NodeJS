const express = require('express');

const covidController = require('../controllers/covid');

const router = express.Router();

router.get('/thong-tin-covid', covidController.getCovid);

router.post('/post-covid', covidController.postCovid);

module.exports = router;
