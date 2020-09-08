const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller');
const authenticateToken = require('../public/middleware/authenticate');
require('dotenv').config();

// Fanfic routes
router.post('/fanfic', authenticateToken(["admin"]), admin_controller.postFanfic)

router.put('/fanfic', authenticateToken(["admin"]), admin_controller.editFanfic)

router.delete('/fanfic', authenticateToken(["admin"]), admin_controller.deleteFanfic)

// Chapter routes
router.post('/chapter', authenticateToken(["admin"]), admin_controller.postChapter)

router.put('/chapter', authenticateToken(["admin"]), admin_controller.editChapter)

router.delete('/chapter', authenticateToken(["admin"]), admin_controller.deleteChapter)

module.exports = router;
