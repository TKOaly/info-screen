const fs = require('fs')
const express = require('express')
const moment = require('moment')

const index = require('./controllers/index')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('static'))
app.get('/', index)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))