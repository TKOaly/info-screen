const fs = require('fs')
const express = require('express')
const moment = require('moment')
const { fetchUpcomingEvents } = require('./services/tkoalyEventService')

const index = require('./controllers/index')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('static'))
app.use(express.static('dist'))
app.get('/', index)
app.get('/api/events/upcoming', (req, res) => {
  fetchUpcomingEvents()
    .then(events => {
      res.json(events)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))