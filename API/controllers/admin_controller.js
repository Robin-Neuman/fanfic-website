const Admin = require('../models/Admin')

async function loginAdmin(req, res) {
  let token = await Admin.loginAdmin(req.body.username, req.body.password)
  return res.json(token)
}

module.exports = { loginAdmin }