const jwt = require('jsonwebtoken')

async function authenticateToken(req, res, next) {
    var bearer = req.headers.authorization;
    var token;
    if (bearer !== undefined) {
        token = bearer.split(' ')
    }
    if (token !== undefined) {
        jwt.verify(token[1], process.env.SECRET_TOKEN, function(err) {
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