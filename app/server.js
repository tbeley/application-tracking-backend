if (typeof PhusionPassenger !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false })
}

const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/apply-tracking', (req, res) => {
  res.json({ message: 'Hello World' })
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

if (typeof PhusionPassenger !== 'undefined') {
  app.listen('passenger')
  console.log(`Server is running with passenger`)
} else {
  const PORT = process.env.PORT || 3030
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

// List all routes
app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path)
  }
})

const db = require('./models')

db.sequelize.sync()
