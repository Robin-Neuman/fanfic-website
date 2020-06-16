const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const DB = require('./DB');

async function getUsers(limit) {

  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT username, id FROM users LIMIT ${limit}; SELECT * FROM users_relations LIMIT ${limit}; SELECT * FROM users_profiles LIMIT ${limit}`, (err, rows) => {
  
      var usersData = { users: [], usersRelations: [], usersProfiles: [] }
    
        if (err) {
          reject(err);
        } else {
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
        }   
      })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function registerUser(username, password, email) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
      if (err) {
        reject(err)
      }
      if (rows.length) {
        reject("Username already taken")
      } else {
        const newUserCreds = {
          username: username,
          password: bcrypt.hashSync(password),
          email: email
        }
  
        DB.query(`INSERT INTO users (username, password, email) values ('${newUserCreds.username}', '${newUserCreds.password}', '${newUserCreds.email}')`, (err, rows) => {  
          if (err) {
            reject(err)
          } else {
            if (rows) {
              newUserCreds.id = rows.insertId
              DB.query(`INSERT INTO users_profiles (user_id) values ('${newUserCreds.id}')`, (err, rows) => {  
                if (err) {
                  reject(err)
                } else {
                  resolve(true)
                }
              })
            }
          }
        })
      } 
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function loginUser(username, password) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT id, username, email, password FROM users WHERE username = '${username}'`, (err, rows) => {
      if (rows[0] && password !== undefined) {
        if (err) {
          reject(err)
        } else {
          if (bcrypt.compareSync(password, rows[0].password)) {
            jsonwebtoken.sign({ user: rows[0], role: "user" }, process.env.SECRET_TOKEN, { expiresIn: '10 m'}, (error, token) => {
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

module.exports = { getUsers, registerUser, loginUser }