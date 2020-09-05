const express = require('express');
const router = express.Router();
const content_controller = require('../controllers/content_controller');
const authenticateToken = require('../public/middleware/authenticate');
require('dotenv').config();

// GET routes
router.get('/fanfics', content_controller.getFanfics)

router.get('/news', content_controller.getNews)

router.get('/chapters/:id', content_controller.getChapters)

router.get('/comments/:id', content_controller.getComments)

// Comment routes
router.post('/comment', authenticateToken(["user", "admin"]), content_controller.postComment)

router.delete('/comment', authenticateToken(["user", "admin"]), content_controller.deleteComment)

router.put('/comment', authenticateToken(["user", "admin"]), content_controller.editComment)

module.exports = router;