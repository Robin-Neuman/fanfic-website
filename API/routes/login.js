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

router.post('/', async function (req, res, next) {

// password = ${req.body.password}
  connection.query(`SELECT id, username, email, password FROM users WHERE username = '${req.body.username}'`, function (err, results) {
    if (results[0], req.body.password) {
      if (err) {
        throw err;
      } else {
        if (results[0].password === req.body.password) {
          res.send(results[0])
        }
      }
    }
  })
});

module.exports = router;