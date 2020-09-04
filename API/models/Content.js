const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const moment = require('moment')
const DB = require('./DB');

// Get all fanfics without chapters
async function getFanfics(limit) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics LIMIT ${limit}`, (err, rows) => {

      let fanficsData = { fanfics: [] }

      if (err) reject(err)
      rows.map((row) => {
        fanficsData.fanfics.push(
          {
            id: row.id,
            title: row.title,
            summary: row.summary,
            mode: 'view'
          }
        );
      })
      resolve(fanficsData)
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

// Get all chapters and comments belonging to those chapters
async function getChapters(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics_chapters WHERE fanfic_id = '${id}'`, (err, rows) => {
      let chaptersData = { chapters: [] }

      if (err) {
        reject(err);
      } else {
        rows.map((chapter) => {
          chaptersData.chapters.push(
            {
              id: chapter.id,
              fanfic_id: chapter.fanfic_id,
              title: chapter.title,
              content: chapter.chapter_content,
              mode: 'view'
            }
          );
        })
      }
      resolve(chaptersData)
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

async function getComments(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM chapters_comments WHERE chapter_id = '${id}'`, (err, rows) => {
      let commentsData = { comments: [] }

      if (err) {
        reject(err);
      } else {
        rows.map((comment) => {
          let date = moment(comment.created).format('Do MMMM YYYY')
          commentsData.comments.push(
            {
              id: comment.id,
              fanfic_id: comment.fanfic_id,
              chapter_id: comment.chapter_id,
              user_id: comment.user_id,
              title: comment.comment_title,
              content: comment.comment_content,
              img_link: comment.img_link,
              created: date,
              mode: 'view'
            }
          );
        })
      }
      resolve(commentsData)
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

// Get all news from database
async function getNews() {
  const query = new Promise((resolve, reject) => {
    DB.query('SELECT * FROM news', function (err, rows) {

      let newsArr = { news: [] }

      if (err) {
        reject(err);
      } else {
        rows.map((row) => {
          let date = moment(row.created).format('Do MMMM YYYY')
          newsArr.news.push(
            {
              id: row.id,
              title: row.title,
              content: row.content,
              image: row.news_img,
              created: date
            }
          );
        })
      }
      resolve(newsArr)
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

// Post comment on fanfic chapter
async function postComment(fanfic_id, chapter_id, title, content, user_id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`INSERT INTO chapters_comments (fanfic_id, chapter_id, comment_title, comment_content, user_id) 
                values ('${fanfic_id}', '${chapter_id}', '${title}', '${content}', '${user_id}')`,
      (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows[0])
        }
      })
  }).catch((error) => {
    return (error)
  })
  return await query
}

// Delete comment on fanfic chapter
async function deleteComment(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`DELETE FROM chapters_comments WHERE id = '${id}'`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

async function editComment(title, content, id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`UPDATE chapters_comments SET comment_title = '${title}', comment_content = '${content}' WHERE id = '${id}'`, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows[0])
      }
    })
  }).catch((error) => {
    return (error)
  })
  return await query
}

module.exports = { getFanfics, getChapters, getComments, getNews, postComment, deleteComment, editComment }