const Admin = require('../models/Admin')

async function postFanfic(req, res) {
  let response = await Admin.postFanfic(req.body.title, req.body.summary)
  return res.json(response)
}

async function editFanfic(req, res) {
  let response = await Admin.editFanfic(req.body.title, req.body.summary, req.body.fanfic_id)
  return res.json(response)
}

async function deleteFanfic(req, res) {
  let response = await Admin.deleteFanfic(req.body.fanfic_id)
  return res.json(response)
}

async function postChapter(req, res) {
  let response = await Admin.postChapter(req.body.title, req.body.summary)
  return res.json(response)
}

async function editChapter(req, res) {
  let response = await Admin.editChapter(req.body.title, req.body.summary, req.body.chapter_id)
  return res.json(response)
}

async function deleteChapter(req, res) {
  let response = await Admin.deleteChapter(req.params.chapter_id)
  return res.json(response)
}

module.exports = { postFanfic, editFanfic, deleteFanfic, postChapter,editChapter,deleteChapter }