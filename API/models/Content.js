const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const moment = require('moment')
const DB = require('./DB');

// Get all fanfics without chapters
async function getFanfics(limit) {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics LIMIT ${limit}`, (err, rows) => {
    
      let fanficsData = { fanfics: [] }
    
      if (err) {
        reject(err);
      } else {
        rows.map((row) => {
          fanficsData.fanfics.push(
            {
              id: row.id,
              title: row.title,
              summary: row.summary
            }
          );
        })
      }
      resolve(fanficsData)
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

// Get all chapters and comments belonging to those chapters
async function getChapters() {
  const query = new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM fanfics_chapters; SELECT * FROM chapters_comments`, (err, rows) => {
      let chaptersData = { chapters: [] }

      if (err) {
        reject(err);
      } else {
        rows[0].map((chapter) => {
          let comments = []
          rows[1].map((comment) => {
            if (comment.chapter_id == chapter.id) {
              let date = moment(comment.created).format('Do MMMM YYYY')
              comments.push(
                {
                  id: comment.id,
                  fanfic_id: comment.fanfic_id,
                  chapter_id: comment.chapter_id,
                  username: comment.username,
                  title: comment.comment_title,
                  content: comment.comment_content,
                  img_link: comment.img_link,
                  created: date
                }
              );
            }
          })
          chaptersData.chapters.push(
            {
              id: chapter.id,
              fanfic_id: chapter.fanfic_id,
              title: chapter.title,
              content: chapter.chapter_content,
              comments: comments
            }
          );
        })
      }
      console.log(chaptersData)
      resolve(chaptersData)
    })
  }).catch((error) => {
    return(error)
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
    return(error)
  })
  return await query
}

// Post comment on fanfic chapter
async function postComment(fanfic_id, chapter_id, title, content, username) {
  const query = new Promise((resolve, reject) => {
    DB.query(`INSERT INTO chapter_comments (fanfic_id, chapter_id, comment_title, username) 
                values ('${fanfic_id}', '${chapter_id}', '${title}', '${content}', '${username}')`, 
    (err, rows) => {  
      if (err) {
        reject(err)
      } 
      if (rows.affectedRows == 0) {
        console.log("NOT POSTED")
      } else {
        resolve(true)
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

// Delete comment on fanfic chapter
async function deleteComment(id) {
  const query = new Promise((resolve, reject) => {
    DB.query(`DELETE FROM chapter_comments WHERE id = '${id}'`, (err, rows) => {  
      if (err) {
        reject(err)
      } 
      if (rows.affectedRows == 0) {
        console.log("NOT DELETED")
      } else {
        resolve(true)
      }
    })
  }).catch((error) => {
    return(error)
  })
  return await query
}

module.exports = { getFanfics, getChapters, getNews, postComment, deleteComment }