const express = require('express');
const router = express.Router();
require('dotenv').config();

const mysql = require('mysql');

var connection;

var dbConfig = require('../public/configs/dbConfig');

function handleConnection(dbConfig) {
  connection = mysql.createPool(dbConfig);
  connection.getConnection(function connectDB(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected fanfics');
  })
}

handleConnection(dbConfig)

connection.on('error', function errorDB(err) {
  if (err.code == 'PROTOCOL_CONNECTION_LOST') {
    handleConnection(dbConfig);
  } else {
    throw err;
  }
})

router.get('/', async function (req, res, next) {

  connection.query('SELECT * FROM fanfics; SELECT * FROM fanfics_chapters; SELECT * FROM chapters_comments', function (err, rows) {

    let fanficsData = { fanfics: [], chapters: [], chapterComments: [] }

    if (err) {
      throw err;
    } else {
      rows[0].map((row) => {
        fanficsData.fanfics.push(
          {
            id: row.id,
            title: row.title,
            summary: row.summary
          }
        );
      })
      rows[1].map((row) => {
        fanficsData.chapters.push(
          {
            id: row.id,
            fanfic_id: row.fanfic_id,
            title: row.title,
            content: row.chapter_content
          }
        );
      })
      rows[2].map((row) => {
        fanficsData.chapterComments.push(
          {
            id: row.id,
            fanfic_id: row.fanfic_id,
            chapter_id: row.chapter_id,
            title: row.comment_title,
            content: row.comment_content
          }
        );
      })
    }
    res.json(fanficsData)
  })
});

module.exports = router;