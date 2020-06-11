const jwt = require('jsonwebtoken')

async function authenticateToken(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, function(err) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Sign in to continue.'
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Sign in to continue.'
        });
    }
}

module.exports = authenticateToken;