const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

async function authenticateAdminToken(req, res, next) {
    var bearer = req.headers.authorization;
    var token;
    
    try {
        if (bearer !== undefined) {
            token = bearer.split(' ')
        }
        if (token !== undefined) {
            var decoded = jwt_decode(token[1])
            if (decoded.role === "admin") {
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
                    message: 'User is not signed in as admin.'
                });
            }
        } else {
            return res.status(401).send({
                success: false,
                message: 'Sign in to continue.'
            });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = authenticateAdminToken;