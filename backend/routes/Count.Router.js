const express = require('express');
const { fetchAllProductAll, fetchAllUsersAll,fetchOrdersAll } = require('../controller/Count.Controller');

const router = express.Router();

// Define the route with the correct callback function
router.get('/products', fetchAllProductAll);
router.get('/users', fetchAllUsersAll);
router.get('/orders', fetchOrdersAll)

exports.router = router;
