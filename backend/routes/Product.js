const express = require('express');
const { createAndSendSuppliers} = require('../controller/Product');

const router = express.Router();

router.post('/create-and-send-suppliers', createAndSendSuppliers);

exports.router = router;