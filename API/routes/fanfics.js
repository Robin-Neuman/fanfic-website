const express = require('express');
const router = express.Router();
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
})

connection.connect()

router.get('/', async function (req, res, next) {

  connection.query('SELECT * FROM fanfics; SELECT * FROM fanfics_chapters; SELECT * FROM chapters_comments', function (err, results) {

    let fanficsData = { fanfics: [], chapters: [], chapterComments: [] }

    if (err) {
      throw err;
    } else {
      results[0].map((row) => {
        fanficsData.fanfics.push(
          {
            id: row.id,
            title: row.title,
            summary: row.summary
          }
        );
      })
      results[1].map((row) => {
        fanficsData.chapters.push(
          {
            id: row.id,
            fanfic_id: row.fanfic_id,
            title: row.title,
            chapter_content: row.chapter_content
          }
        );
      })
      results[2].map((row) => {
        fanficsData.chapterComments.push(
          {
            id: row.id,
            fanfic_id: row.fanfic_id,
            chapter_id: row.chapter_id,
            comment_title: row.comment_title,
            comment_content: row.comment_content
          }
        );
      })
    }
    res.json(fanficsData)
  })
});

module.exports = router;