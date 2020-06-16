const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const DB = require('./DB');

async function loginAdmin(username, password) {
  console.log(username, password)
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT id, username, email, password FROM admin_users WHERE username = '${username}'`, (err, rows) => {
      if (rows[0] && password !== undefined) {
        if (err) {
          reject(err)
        } else {
          if (bcrypt.compareSync(password, rows[0].password)) {
            jsonwebtoken.sign({ user: rows[0], role: "admin" }, process.env.SECRET_TOKEN, { expiresIn: '10 h'}, (error, token) => {
              if (error) {
                reject(error)
              } else {
                resolve({
                  token: token
                })
              }
            })
          }
        }
      } else {
        reject('User not found')
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

module.exports = { loginAdmin }