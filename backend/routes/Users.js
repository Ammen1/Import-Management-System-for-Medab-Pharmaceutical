const express = require('express');
const { fetchUserById, updateUser, fetchUser, addUser,deleteUser } = require('../controller/User');

const router = express.Router();
//  /users is already added in base path
router.get('/own', fetchUserById)
      .patch('/:id', updateUser)
      .get('/users', fetchUser)
      .post('/addusers', addUser)
      .delete('/users/:id', deleteUser);

exports.router = router;
