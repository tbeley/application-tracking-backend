const validationSchema = require('../validation/application.validation')

function validateApplication(req, res, next) {
  const { error } = validationSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      message: 'Erreur de validation de la demande.',
      details: error.details,
    })
  }
  next()
}

module.exports = validateApplication
