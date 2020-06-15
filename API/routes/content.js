const express = require('express');
const router = express.Router();
const content_controller = require('../controllers/content_controller');
const authenticateToken = require('../public/functions/authenticate');
require('dotenv').config();

router.get('/fanfics', content_controller.getFanfics)

router.get('/news', content_controller.getNews)

router.get('/chapters/:id', content_controller.getChapters)

router.get('/comments/:id', content_controller.getComments)

router.post('/comment', authenticateToken, content_controller.postComment)

router.delete('/comment', authenticateToken, content_controller.deleteComment)

router.put('/comment', authenticateToken, content_controller.editComment)

module.exports = router;