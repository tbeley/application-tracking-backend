const Joi = require('joi')

const validationSchema = Joi.object({
  company: Joi.string().required().messages({
    'string.base': 'Company must be a string.',
    'string.empty': 'Company is required.',
    'any.required': 'Company is required.',
  }),
  company_infos: Joi.string().allow('').messages({
    'string.base': 'Company infos must be a string.',
  }),
  job: Joi.string().required().messages({
    'string.base': 'Job must be a string.',
    'string.empty': 'Job is required.',
    'any.required': 'Job is required.',
  }),
  date: Joi.string().required().messages({
    'string.base': 'Date must be a string.',
    'string.empty': 'Date is required.',
    'any.required': 'Date is required.',
  }),
  method: Joi.string().required().messages({
    'string.base': 'Method must be a string.',
    'string.empty': 'Method is required.',
    'any.required': 'Method is required.',
  }),
  description: Joi.string().allow('').messages({
    'string.base': 'Description must be a string.',
  }),
  contact: Joi.string().allow('').messages({
    'string.base': 'Contact must be a string.',
  }),
  comment: Joi.string().allow('').messages({
    'string.base': 'Comment must be a string.',
  }),
  source: Joi.string().required().messages({
    'string.base': 'Source must be a string.',
    'string.empty': 'Source is required.',
    'any.required': 'Source is required.',
  }),
  status: Joi.number().valid(0, 1, 2, 3).default(0).messages({
    'number.base': 'Le statut doit être un nombre.',
    'any.required': 'Le statut est obligatoire.',
    'number.only': 'Le statut doit être 0, 1, 2 ou 3.',
  }),
})

module.exports = validationSchema
