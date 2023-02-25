const sanitizeHtml = require('sanitize-html')

function sanitizeBody(req, res, next) {
  for (let key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeHtml(req.body[key])
    }
  }
  next()
}

module.exports = sanitizeBody
