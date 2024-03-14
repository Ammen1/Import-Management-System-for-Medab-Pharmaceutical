const express = require('express');
const { fetchUserById, updateUser, fechUser } = require('../controller/User');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)
      .patch('/:id', updateUser)
      .get('/users', fechUser)

exports.router = router;
