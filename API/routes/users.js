const express = require('express');
const router = express.Router();
// const authenticateToken = require('../public/functions/authenticate');
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
    console.log('connected users');
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

  connection.query('SELECT username, id FROM users; SELECT * FROM users_relations; SELECT * FROM users_profiles', function (err, rows) {

    let usersData = { users: [], usersRelations: [], usersProfiles: [] }

    if (err) {
      throw err;
    } else {
      rows[0].map((row) => {
        usersData.users.push(
          {
            id: row.id,
            username: row.username
          }
        );
      })
      rows[1].map((row) => {
        usersData.usersRelations.push(
          {
            user_id: row.user_id,
            friend_id: row.friend_id
          }
        );
      })
      rows[2].map((row) => {
        usersData.usersProfiles.push(
          {
            id: row.id,
            user_id: row.user_id,
            bio: row.bio,
            profile_img: row.profile_img
          }
        );
      })
    }
    res.json(usersData)
  })
});

module.exports = router;
