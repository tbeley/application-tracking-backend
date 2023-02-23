const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

var corsOptions = {
  origin: 'localhost:3000',
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

const db = require('../app/models')

db.sequelize.sync()
