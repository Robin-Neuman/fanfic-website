const DB = require('./DB');

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
    DB.query(`UPDATE fanfics SET title = "${title}", summary = "${summary}" WHERE id = "${id}"`, (err, rows) => {
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
  console.log(title, content, fanfic_id, id)
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
////
async function deleteChapter(id) {
  console.log(id)
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

module.exports = { postFanfic, editFanfic, deleteFanfic, postChapter, editChapter, deleteChapter }