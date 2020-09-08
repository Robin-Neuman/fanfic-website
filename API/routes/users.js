const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users_controller');
require('dotenv').config();

router.get('/', users_controller.getUsers)

router.post('/', users_controller.register)

router.post('/login', users_controller.login)

module.exports = router;
