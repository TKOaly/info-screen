import express from 'express'
import index from './controllers/index'
import { getEvents } from './controllers/events'
import { getExactumFoodlist, getChemicumFoodlist } from './controllers/foodlist'

const app = express()
const port = process.env.PORT || 4000

app.use(express.static('static'))
app.use(express.static('dist'))

app.get('/', index)
app.get('/api/events/upcoming', getEvents)
app.get('/api/foodlists/exactum', getExactumFoodlist)
app.get('/api/foodlists/chemicum', getChemicumFoodlist)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
