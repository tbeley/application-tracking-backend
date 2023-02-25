const db = require('../models')
const Application = db.application

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll()
    return res.status(200).send(applications)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

exports.createApplication = async (req, res) => {
  try {
    const newApplication = {
      ...req.body,
      status: 0,
    }
    const application = await Application.create(newApplication)
    return res
      .status(201)
      .send({ message: 'Application created successfully', application })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).send({ message: 'Application not found' })
    }
    await application.destroy()
    return res.status(200).send({ message: 'Application deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).send({ message: 'Application not found' })
    }
    const updatedApplication = await application.update(req.body)
    return res.status(200).send({
      message: 'Application updated successfully',
      application: updatedApplication,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}

exports.updateStatus = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id)
    if (!application) {
      return res.status(404).send({ message: 'Application not found' })
    }
    const updatedApplication = await application.update(req.body)
    return res.status(200).send({
      message: 'Application status updated successfully',
      application: updatedApplication,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Internal server error' })
  }
}
