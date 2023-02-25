const db = require('../models')
const User = db.user

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (!user) {
      return res.status(404).send({ message: "L'utilisateur n'a pas été trouvé!" })
    }

    const passwordIsValid = checkPassword(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Mot de passe invalide!',
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
      expiresIn: 86400, // 24 hours
    })

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Erreur lors de la connexion' })
  }
}