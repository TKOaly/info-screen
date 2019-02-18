const fs = require('fs')
const express = require('express')
const Mustache = require('mustache')
const moment = require('moment')
const tkoalyevents = require('tkoalyevents')

const app = express()
const port = process.env.PORT || 3000

const formatDates = events =>
  events.map(event => ({...event, starts: moment(event.starts).fromNow() }))

app.use(express.static('static'))
app.get('/', (req, res) => {
  const template = fs.readFileSync('templates/index.html', { encoding: 'utf8' })
  const view = {}
  tkoalyevents(events => {
    const html = Mustache.render(template, {...view, events: formatDates(events) });
    res.send(html)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))