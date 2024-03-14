const express = require('express');
const { fetchUserById, updateUser, fetchUser } = require('../controller/User');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)
      .patch('/:id', updateUser)
      .get('/users', fetchUser)

exports.router = router;
