const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

function authenticateToken(roles) {
    return async (req, res, next) => {
        var bearer = req.headers.authorization;
        var token;
        try {
            if (bearer !== undefined) {
                token = bearer.split(' ')
            }
            if (token !== undefined) {
                for (let i = 0; i < roles.length; i++) {
                    jwt.verify(token[1], process.env.SECRET_TOKEN, function (err, decoded) {
                        if (err) {
                            console.log(err)
                            return res.status(401).send({
                                success: false,
                                message: 'Sign in to continue.'
                            })
                        }
                        if (decoded.role === roles[i]) {
                            next();
                        }
                    })
                }
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'Sign in to continue.'
                });
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = authenticateToken;