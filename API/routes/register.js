const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
    console.log('connected register');
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

  connection.query(`SELECT * FROM users WHERE username = '${req.body.username}'`, (err, rows) => {
    if (err) {
      res.send(err)
      return
    }
    if (rows.length) {
      res.send("Username already taken")
      return
    } else {
      const newUserCreds = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email
      }

      connection.query(`INSERT INTO users (username, password, email) values ('${newUserCreds.username}', '${newUserCreds.password}', '${newUserCreds.email}')`, (err, rows) => {
        newUserCreds.id = rows.insertId
        console.log(newUserCreds)

        if (err) {
          res.send(err)
        } else {
          res.send(true)
        }
      })
    }
    
  })
});

module.exports = router;