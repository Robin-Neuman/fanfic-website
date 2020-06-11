const Content = require('../models/Content')

async function getFanfics(req, res) {
  let fanfics = await Content.getFanfics(500)
  return res.json(fanfics)
}

async function getChapters(req, res) {
  let chapters = await Content.getChapters()
  return res.json(chapters)
}

async function getNews(req, res) {
  let news = await Content.getNews()
  return res.json(news)
}

async function postComment(req, res) {
  let response = await Content.postComment(
    req.body.fanfic_id, req.body.chapter_id, req.body.title, req.body.content, req.body.username
  )
  return res.json(response)
}

async function deleteComment(req, res) {
  let response = await Content.deleteComment(req.body.id)
  return res.json(response)
}

module.exports = { getFanfics, getChapters, getNews, postComment, deleteComment }