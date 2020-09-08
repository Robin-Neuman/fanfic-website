const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const DB = require('./DB');

async function getUsers(limit) {

  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT username, id FROM users LIMIT ${limit}; SELECT * FROM users_relations LIMIT ${limit}; SELECT * FROM users_profiles LIMIT ${limit}`, (err, rows) => {
      var usersData = { users: [], usersRelations: [], usersProfiles: [] }
      if (err) reject(err)
//
////
      rows[0].map((row) => {
        usersData.users.push(
          {
            id: row.id,
            username: row.username
          }
        );
      })
      rows[1].map((row) => {
        usersData.usersRelations.push(
          {
            user_id: row.user_id,
            friend_id: row.friend_id
          }
        );
      })
      rows[2].map((row) => {
        usersData.usersProfiles.push(
          {
            id: row.id,
            user_id: row.user_id,
            bio: row.bio,
            profile_img: row.profile_img
          }
        );
      })
      resolve(usersData)
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

async function registerUser(username, password, email) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
      if (err) reject(err)
      if (rows.length) {
        reject({
          success: false,
          message: "Username already taken"
        })
      } else {
        DB.query(`INSERT INTO users (username, password, email) values ('${username}', '${bcrypt.hashSync(password)}', '${email}')`, (err, rows) => {
          if (err) reject(err)
          if (rows) {
            id = rows.insertId
            DB.query(`INSERT INTO users_profiles (user_id) values ('${id}')`, (err, rows) => {
              if (err) reject(err)
              if (rows) {
                resolve({
                  success: true,
                  message: "User successfully registered"
                })
              } else {
                reject({
                  success: false,
                  message: "Error creating user, contact support for further assistance"
                })
              }
            })
          } else {
            reject({
              success: false,
              message: "Error creating user, contact support for further assistance"
            })
          }
        })
      }
    })
  }).catch((err) => {
    return (err)
  })
  return await query
}

async function loginUser(username, password) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT id, username, email, password, role FROM users WHERE username = '${username}'`, (err, rows) => {
      if (rows[0] && password !== undefined) {
        if (err) reject(err)
        if (bcrypt.compareSync(password, rows[0].password)) {
          jsonwebtoken.sign({ user: rows[0], role: rows[0].role }, process.env.SECRET_TOKEN, { expiresIn: '10 h' }, (err, token) => {
            if (err) reject(err)
            resolve({
              success: true,
              message: "Successful login",
              token: token
            })
          })
        } else {
          reject({
            success: false,
            message: "Username or password is incorrect"
          })
        }
      } else {
        reject({
          success: false,
          message: "Username or password is incorrect"
        })
      }
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

module.exports = { getUsers, registerUser, loginUser }