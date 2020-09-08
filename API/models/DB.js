
const mysql = require('mysql');
const dbConfig = require('../public/configs/dbConfig');

let connection = mysql.createPool(dbConfig);
connection.getConnection(function connectDB(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected DB');
//
  connection.on('error', function errorDB(err) {
    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw err;
    }
  })    
})

module.exports = connection