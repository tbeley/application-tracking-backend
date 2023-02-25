const verifyToken = require('../middleware/authJwt')
const controller = require('../controllers/application.controller')
const sanitizeBody = require('../middleware/sanitize')
const validateApplication = require('../middleware/validateApplication')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get(
    '/application-tracking/api/applications',
    [verifyToken],
    controller.getApplications
  )
  app.post(
    '/application-tracking/api/applications',
    [verifyToken, sanitizeBody, validateApplication],
    controller.createApplication
  )
  app.put(
    '/application-tracking/api/applications/:id',
    [verifyToken, sanitizeBody, validateApplication],
    controller.updateApplication
  )
  app.put(
    '/application-tracking/api/applications/status/:id',
    [verifyToken, sanitizeBody],
    controller.updateStatus
  )
  app.delete(
    '/application-tracking/api/applications/:id',
    [verifyToken],
    controller.deleteApplication
  )
}
