const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const DB = require('./DB');

async function loginAdmin(username, password) {
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

// Fanfic functions
async function postFanfic(title, summary) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics WHERE title = '${title}'`, (err, rows) => {
      if (rows[0]) {
        reject("Fanfic with that name already exists")
      } 
      if (err) {
        reject(err)
      } else {
        DB.query(`INSERT INTO fanfics (title, summary) values ('${title}', '${summary}')`, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows[0])
          }
        })
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function editFanfic(title, summary, id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`UPDATE fanfics SET title = '${title}', summary = '${summary}' WHERE id = '${id}'`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function deleteFanfic(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`DELETE FROM fanfics WHERE id = ${id}`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

// Chapter functions
async function postChapter(title, content, id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics_chapters WHERE title = '${title}' AND fanfic_id = '${id}' `, (err, rows) => {
      if (rows[0]) {
        reject("Chapter with that title already exists for this fanfic")
      } 
      if (err) {
        reject(err)
      } else {
        DB.query(`INSERT INTO fanfics_chapters (title, chapter_content, fanfic_id) values ('${title}', '${content}', '${id}')`, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows[0])
          }
        })
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function editChapter(title, content, fanfic_id, id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`UPDATE fanfics_chapters SET title = '${title}', chapter_content = '${content}', fanfic_id = '${fanfic_id}' WHERE id = '${id}'`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

async function deleteChapter(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`DELETE FROM fanfics_chapters WHERE id = ${id}`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

module.exports = { loginAdmin, postFanfic, editFanfic, deleteFanfic, postChapter, editChapter, deleteChapter }