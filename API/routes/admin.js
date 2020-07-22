const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin_controller');
const authenticateAdminToken = require('../public/functions/authenticateAdmin');
require('dotenv').config();

router.post('/login', admin_controller.loginAdmin)

// Fanfic routes
router.post('/fanfic', authenticateAdminToken, admin_controller.postFanfic)

router.put('/fanfic', authenticateAdminToken, admin_controller.editFanfic)

router.delete('/fanfic', authenticateAdminToken, admin_controller.deleteFanfic)

// Chapter routes
router.post('/chapter', authenticateAdminToken, admin_controller.postChapter)

router.put('/chapter', authenticateAdminToken, admin_controller.editChapter)

router.delete('/chapter', authenticateAdminToken, admin_controller.deleteChapter)

module.exports = router;
