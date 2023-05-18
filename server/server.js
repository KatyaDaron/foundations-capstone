require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getRestaurants} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

// RESTAURANTS
app.get('/restaurants', getRestaurants)

// CITIES
// app.post('/cities', createCity)
// app.get('/cities', getCities)
// app.delete('/cities/:id', deleteCity)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))