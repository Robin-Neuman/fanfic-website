const express = require('express');

const server = express();

const port = 5000;

server.get('/', (req, res) => {

    res.send(
        '<p>Hello</p>'
    )
})

server.listen(port, () => console.log(`Server started on port ${port}`))