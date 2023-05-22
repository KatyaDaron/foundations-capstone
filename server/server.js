require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed, getRestaurants, getRoutes, getParks, createPost, getWeather, searchRestaurants } = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.get('/restaurants', getRestaurants);
app.get('/routes', getRoutes);
app.get('/parks', getParks);
app.post('/post', createPost);
app.get('/weather', getWeather);
app.get('/restaurants/search', searchRestaurants);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))