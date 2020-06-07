const express = require('express');
const request = require('request');
const Axios = require('axios')
require('dotenv').config();

const server = express();

const port = 5000;

server.listen(port, () => console.log(`Server started on port ${port}`))