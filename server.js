import express from 'express'
import { fetchUpcomingEvents } from './services/tkoalyEventService'
import index from './controllers/index'

const app = express()
const port = process.env.PORT || 4000

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
