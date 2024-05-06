const express = require('express');
const router = express.Router();
const { getAllMessages, getMessages }  = require('../controller/MessageController');

// Route to get messages for a specific user
router.get('/messages/:userId', getMessages);

// Route to get all messages
router.get('/messages/all', getAllMessages);

exports.router = router;
