const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller');
const authenticateToken = require('../public/functions/authenticate');
require('dotenv').config();

router.post('/login', admin_controller.loginAdmin)

module.exports = router;
