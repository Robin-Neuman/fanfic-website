const express = require('express');
const router = express.Router();
require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

connection.connect()

router.get('/', async function (req, res, next) {

  connection.query('SELECT * FROM news', function (err, results) {

    let newsArr = { news: [] }

    if (err) {
      throw err;
    } else {
      results.map((row) => {
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