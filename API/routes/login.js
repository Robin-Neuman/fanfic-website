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
    console.log('connected login');
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
  connection.query(`SELECT id, username, email, password FROM users WHERE username = '${req.body.username}'`, function (err, rows) {
    if (rows[0], req.body.password) {
      if (err) {
        throw err;
      } else {
        if (bcrypt.compareSync(req.body.password, rows[0].password)) {
          jsonwebtoken.sign({ user: rows[0] }, process.env.SECRET_TOKEN, { expiresIn: '10 days'}, (error, token) => {
            if (error) {
              throw(error)
            } else {
              res.json({
                token: token
              })
            }
          })
        }
      }
    }
  })
});

module.exports = router;