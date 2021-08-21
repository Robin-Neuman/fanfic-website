const Content = require('../models/Content')

async function getFanfics(req, res) {
  console.log(req)
  let fanfics = await Content.getFanfics(500)
  return res.json(fanfics)
}

async function getChapters(req, res) {
  console.log(req)
  let chapters = await Content.getChapters(req.params.id)
  return res.json(chapters)
}

async function getComments(req, res) {
  console.log(req)
  let comments = await Content.getComments(req.params.id)
  return res.json(comments)
}

async function getNews(req, res) {
  let news = await Content.getNews()
  return res.json(news)
}

async function postComment(req, res) {
  let response = await Content.postComment(
    req.body.fanfic_id, req.body.chapter_id, req.body.title, req.body.content, req.body.user_id
  )
  return res.json(response)
}

async function deleteComment(req, res) {
  let response = await Content.deleteComment(req.body.comment_id)
  return res.json(response)
}

async function editComment(req, res) {
  let response = await Content.editComment(req.body.title, req.body.content, req.body.comment_id)
  return res.json(response)
}

module.exports = { getFanfics, getChapters, getComments, getNews, postComment, deleteComment, editComment }