const express = require('express');

const checkOutController = require('../controllers/checkout');


const router = express.Router();

router.post('/check-out', checkOutController.postCheckOut);

router.get('/check-out', checkOutController.getCheckOut);





module.exports = router;