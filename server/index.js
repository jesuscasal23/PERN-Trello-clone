const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = 3000
const app = express()
app.use(bodyParser.json())
app.use(cors())

require('./routes/categories')(app)
require('./routes/tasks')(app)

app.listen(port, () => {
  console.log('server running on port: ' + port)
})
