const express = require('express');
const { addMessage, getMessages }  = require('../controller/MessageController.js');

const router = express.Router();
router.post('/', addMessage);

router.get('/:chatId', getMessages);

exports.router = router;