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
    console.log('connected news');
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

  connection.query('SELECT * FROM news', function (err, rows) {

    let newsArr = { news: [] }

    if (err) {
      throw err;
    } else {
      rows.map((row) => {
        newsArr.news.push(
          {
            id: row.id,
            title: row.title,
            content: row.content,
            image: row.news_img,
            created: row.created
          }
        );
      })
    }
    res.json(newsArr)
  })
});

module.exports = router;