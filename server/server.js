require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getRestaurants, getRoutes, getParks} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

// RESTAURANTS
app.get('/restaurants', getRestaurants);
app.get('/routes', getRoutes);
app.get('/parks', getParks);

// CITIES
// app.post('/cities', createCity)
// app.delete('/cities/:id', deleteCity)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))