const jwt = require('jsonwebtoken')
const db = require('../models')

const HEADER_TOKEN_NAME = 'x-access-token'
const ERROR_MESSAGES = {
  NO_TOKEN: 'Aucun token fourni!',
  INVALID_TOKEN: 'Token invalide ou expiré!',
}

const verifyToken = (req, res, next) => {
  const token = req.headers[HEADER_TOKEN_NAME]

  if (!token) {
    return res.status(403).send({
      message: ERROR_MESSAGES.NO_TOKEN,
    })
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: ERROR_MESSAGES.INVALID_TOKEN,
      })
    }

    req.userId = decoded.id
    next()
  })
}

module.exports = verifyToken