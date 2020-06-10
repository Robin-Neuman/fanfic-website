import Users from '../models/Users'

function load(req, res, next, id) {
  Users.findById(id)
    .exec()
    .then((user) => {
      req.dbUser = user
      return next()
    }, (e) => next(e))
}

function get(req, res) {
  return res.json(req.dbUser)
}