const express = require('express');
const request = require('request');
require('dotenv').config();

const server = express();

const port = 5000;

server.get('/users', function (req, res) {
    request(`http://localhost:3000/users`, function (err, response, body) {
        if (!err && res.statusCode == 200) {
            res.send(body)
        }
    })
})

server.get('/news', function (req, res) {
    request('http://localhost:3000/news', function (err, response, body) {
        if (!err && res.statusCode == 200) {
            res.send(body)
        }
    })
})

server.get('/fanfics', function (req, res) {
    request('http://localhost:3000/fanfics', function (err, response, body) {
        if (!err && res.statusCode == 200) {
            res.send(body)
        }
    })
})

server.listen(port, () => console.log(`Server started on port ${port}`))