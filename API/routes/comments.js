const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
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
    console.log('connected comments');
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

router.post('/', async function (req, res, next) {
  connection.query(`INSERT INTO chapters_comments (comment_title, comment_content, fanfic_id, chapter_id)
                    values ('${req.body.title}', '${req.body.content}', '${req.params.fanfic_id}', '${req.params.chapter_id}')`, 
                    (err, rows) => {
    if (err) {
      res.send(err)
    } else {
      res.send(true)
    }
  })
});

module.exports = router;