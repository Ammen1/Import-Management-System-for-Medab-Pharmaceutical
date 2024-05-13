const express = require('express');
const { createAndSendSuppliers, generateProductReports} = require('../controller/Product');

const router = express.Router();

router.post('/create-and-send-suppliers', createAndSendSuppliers);
router.post('/generate', generateProductReports)

exports.router = router;