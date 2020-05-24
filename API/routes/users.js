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

  connection.query('SELECT username, id FROM users; SELECT * FROM users_relations; SELECT * FROM users_profiles', function (err, results) {

    let usersData = { users: [], usersRelations: [], usersProfiles: [] }

    if (err) {
      throw err;
    } else {
      results[0].map((row) => {
        usersData.users.push(
          {
            id: row.id,
            username: row.username
          }
        );
      })
      results[1].map((row) => {
        usersData.usersRelations.push(
          {
            user_id: row.user_id,
            friend_id: row.friend_id
          }
        );
      })
      results[2].map((row) => {
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
