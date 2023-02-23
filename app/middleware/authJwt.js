const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'Aucun token fourni!',
    })
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Non authorisé!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: "Nécessite le rôle d'administrateur!",
      })
      return
    })
  })
}

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Nécessite le rôle de modérateur!',
      })
    })
  })
}

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }

        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: "Nécessite le rôle de modérateur ou d'administrateur!",
      })
    })
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
}
module.exports = authJwt
