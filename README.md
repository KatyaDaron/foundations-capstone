# BrookDiscover

BrookDiscover is a web application that showcases the hidden gems of Brooklyn and also serves as a vibrant platform for the community to share and explore their favorite local spots.

## Project Video
https://www.loom.com/share/9554d7e77aa543309e3ff215eb7de2a7

## Features

1. Displaying Restaurants, Routes and Parks: The project includes functions to retrieve data for restaurants, routes and parks from the database and display them on the webpage. There are separate functions to display each category of data.
2. Creating Posts: The project includes a form that allows users to submit new data for restaurants, routes and parks. When the form is submitted, the data is sent as a POST request to the server.
3. Weather Display: The project includes a function to retrieve weather data from an external API and display it on the webpage. The weather information includes the location, temperature, weather condition and temperature range.
4. Random Restaurant Selection: The project includes a function that picks a random restaurant from the displayed restaurants and opens its visit link in a new tab when a button is clicked.
5. Search Functionality: The project includes search functionality for restaurants, routes and parks. Users can enter a search query in the respective search input field which triggers a GET request to the server to retrieve matching results. The matching results are then displayed on the webpage.
6. Server-side Implementation: The project includes an Express server with various endpoints for handling requests related to seeding the database, retrieving data, creating posts and performing searches. The server interacts with a PostgreSQL database using Sequelize.

## Technologies Used

The project combines HTML, CSS and JavaScript for the client-side web interface.
Node.js, Express.js, PostgreSQL and Sequelize are used for server-side operations, data storage and API functionality.