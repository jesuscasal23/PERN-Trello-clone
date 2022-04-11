const express = require('express')
var cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = 3000
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'client/build/index.html')))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build/index.html')))
}

require('./routes/categories')(app)
require('./routes/tasks')(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(process.env.PORT || port, () => {
  console.log('server running on port: ' + process.env.PORT || port)
})
