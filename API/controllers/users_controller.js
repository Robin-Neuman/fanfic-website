const Users = require('../models/Users')

async function getUsers(req, res) {
  let users = await Users.getUsers(500)
  return res.json(users)
}

async function register(req, res) {
  let response = await Users.registerUser(req.body.username, req.body.password, req.body.email)
  return res.json(response)
}

async function login(req, res) {
  let token = await Users.loginUser(req.body.username, req.body.password)
  return res.json(token)
}

module.exports = { getUsers, register, login }