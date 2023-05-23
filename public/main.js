const restContainer = document.querySelector('.restaurants-main');
const routesContainer = document.querySelector('.routes-main');
const parksContainer = document.querySelector('.parks-main');
const homeMain = document.querySelector('.home-main');
const categoryDropdown = document.querySelector('#category');
const linkInputContainer = document.querySelector('#linkInputContainer');
const form = document.querySelector('form');
const restButton = document.querySelector("#btnPick");
const restSearchInput = document.querySelector('#rest-search-input');
const routeSearchInput = document.querySelector('#route-search-input');
const parkSearchInput = document.querySelector('#park-search-input');

const baseURL = 'http://localhost:4004';

function getRestaurants() {
  axios.get(`${baseURL}/restaurants`)
    .then(res => {
      displayRestaurants(res.data);
    })
    .catch(err => console.log(err));
}

function getRoutes() {
  axios.get(`${baseURL}/routes`)
    .then(res => {
      displayRoutes(res.data);
    })
    .catch(err => console.log(err));
}

function getParks() {
  axios.get(`${baseURL}/parks`)
    .then(res => {
      displayParks(res.data);
    })
    .catch(err => console.log(err));
}

function displayRestaurants(restaurantsArr) {
  restContainer.innerHTML = '';

  restaurantsArr.forEach(restaurant => {
    const div = document.createElement('div');
    div.className = 'rest-card';
    div.id = 'card-' + restaurant.restaurant_id;

    const typeDiv = document.createElement('div');
    typeDiv.className = 'type';
    typeDiv.textContent = restaurant.type;

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = restaurant.name;

    const description = document.createElement('p');
    description.textContent = restaurant.description;

    const link = document.createElement('a');
    link.href = restaurant.visit_link;
    link.target = '_blank';
    link.textContent = 'Visit >>';

    const lineBreak = document.createElement('br');
    description.appendChild(lineBreak);

    description.appendChild(link);

    const image = document.createElement('img');
    image.src = restaurant.image;
    image.alt = 'restaurant picture';

    div.appendChild(typeDiv);
    div.appendChild(nameDiv);
    div.appendChild(description);
    div.appendChild(image);

    restContainer.appendChild(div);
  });
}

function displayRoutes(routesArr) {
  routesContainer.innerHTML = '';

  routesArr.forEach(route => {
    const div = document.createElement('div');
    div.className = 'route-card';
    div.id = 'route-' + route.route_id;

    const typeDiv = document.createElement('div');
    typeDiv.className = 'type';
    typeDiv.textContent = route.type;

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = route.name;

    const description = document.createElement('p');
    description.textContent = route.description;

    const image = document.createElement('img');
    image.src = route.image;
    image.alt = 'walking route picture';

    div.appendChild(typeDiv);
    div.appendChild(nameDiv);
    div.appendChild(description);
    div.appendChild(image);

    routesContainer.appendChild(div);
  });
}

function displayParks(parksArr) {
  parksContainer.innerHTML = '';

  parksArr.forEach(park => {
    const div = document.createElement('div');
    div.className = 'park-card';
    div.id = 'park-' + park.park_id;

    const typeDiv = document.createElement('div');
    typeDiv.className = 'type';
    typeDiv.textContent = park.type;

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = park.name;

    const description = document.createElement('p');
    description.textContent = park.description;

    const image = document.createElement('img');
    image.src = park.image;
    image.alt = 'park picture';

    div.appendChild(typeDiv);
    div.appendChild(nameDiv);
    div.appendChild(description);
    div.appendChild(image);

    parksContainer.appendChild(div);
  });
}

restContainer === null || restContainer === void 0
  ? void 0
  : getRestaurants();

routesContainer === null || routesContainer === void 0
  ? void 0
  : getRoutes();

parksContainer === null || parksContainer === void 0
  ? void 0
  : getParks();

categoryDropdown === null || categoryDropdown === void 0
  ? void 0
  : categoryDropdown.addEventListener('change', function () {
    if (categoryDropdown.value === 'restaurants') {
      linkInputContainer.style.display = 'flex';
    } else {
      linkInputContainer.style.display = 'none';
    }
  });

const formSubmit = (event) => {
  event.preventDefault();

  const category = document.getElementById('category');
  const type = document.getElementById('type');
  const name = document.getElementById('name');
  const description = document.getElementById('description');
  const image = document.getElementById('image');
  const link = document.getElementById('link');
  let formData = {};

  if (link.value === '') {
    formData = {
      category: category.value,
      type: type.value,
      name: name.value.toUpperCase(),
      description: description.value,
      image: image.value
    };
  } else {
    formData = {
      category: category.value,
      type: type.value,
      name: name.value.toUpperCase(),
      description: description.value,
      image: image.value,
      link: link.value
    };
  }

  const submittedText = document.createElement('div');
  submittedText.id = 'submitted-text';
  submittedText.innerText = 'Thank you for your contribution!';
  submittedText.style.fontFamily = 'cursive';
  form.appendChild(submittedText);

  setTimeout(() => {
    submittedText.remove();
  }, 3000);

  createPost(formData);

  form.reset();
}

form === null || form === void 0
  ? void 0
  : form.addEventListener('submit', formSubmit);

const createPost = body => {
  axios.post(`${baseURL}/post`, body)
    .catch(err => console.log(err));
}

homeMain === null || homeMain === void 0
  ? void 0
  : getWeather();

function getWeather() {
  axios.get(`${baseURL}/weather`)
    .then(res => {
      console.log(res.data)
      const location = res.data.location.name;
      const temp = res.data.current.temp_f;
      const condition = res.data.current.condition.text;
      const tempMax = res.data.forecast.forecastday[0].day.maxtemp_f;
      const tempMin = res.data.forecast.forecastday[0].day.mintemp_f;
      displayWeather(location, temp, condition, tempMax, tempMin);
    })
    .catch(err => console.log(err));
}

function displayWeather(location, temp, condition, tempMax, tempMin) {
  const weatherContainer = document.createElement('div');
  weatherContainer.classList.add('weather-container');

  const locationElement = document.createElement('h1');
  locationElement.textContent = `${location.toUpperCase()}`;
  weatherContainer.appendChild(locationElement);

  const temperatureElement = document.createElement('span');
  temperatureElement.textContent = `${Math.round(temp)}°F`;
  temperatureElement.classList.add('temperature');
  weatherContainer.appendChild(temperatureElement);

  const conditionElement = document.createElement('h3');
  conditionElement.textContent = `${condition}`;
  weatherContainer.appendChild(conditionElement);

  const tempRangeElement = document.createElement('h3');
  tempRangeElement.textContent = `H:${Math.round(tempMax)}°F L:${Math.round(tempMin)}°F`;
  weatherContainer.appendChild(tempRangeElement);

  const firstChild = homeMain.firstChild;
  homeMain.insertBefore(weatherContainer, firstChild);
}

restButton === null || restButton === void 0
  ? void 0
  : restButton.addEventListener("click", pickRestaurant);

function pickRestaurant() {
  const restaurants = document.querySelectorAll(".rest-card");
  let restArr = [...restaurants];
  let numRestCards = restArr.length;
  let randomNum = Math.floor(Math.random() * numRestCards);
  let selectedRest = restArr[randomNum];
  let link = selectedRest.querySelector("a").href;

  window.open(link, "_blank");
}

restSearchInput === null || restSearchInput === void 0
  ? void 0
  : restSearchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchQuery = restSearchInput.value.toLowerCase();
      performRestSearch(searchQuery);
      restSearchInput.value = '';
    }
  });

function performRestSearch(query) {
  console.log('Performing search for:', query);
  axios.get(`${baseURL}/restaurants/search?q=${query}`)
    .then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        alert('Sorry, there is nothing that matches your search');
      } else {
        console.log(`Found:`, res.data);
        displayRestaurants(res.data);
      }
    })
    .catch(err => console.log(err));
}

routeSearchInput === null || routeSearchInput === void 0
  ? void 0
  : routeSearchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchQuery = routeSearchInput.value.toLowerCase();
      performRouteSearch(searchQuery);
      routeSearchInput.value = '';
    }
  });

function performRouteSearch(query) {
  console.log('Performing search for:', query);
  axios.get(`${baseURL}/routes/search?q=${query}`)
    .then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        alert('Sorry, there is nothing that matches your search');
      } else {
        console.log(`Found:`, res.data);
        displayRoutes(res.data);
      }
    })
    .catch(err => console.log(err));
}

parkSearchInput === null || parkSearchInput === void 0
  ? void 0
  : parkSearchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchQuery = parkSearchInput.value.toLowerCase();
      performParkSearch(searchQuery);
      parkSearchInput.value = '';
    }
  });

function performParkSearch(query) {
  console.log('Performing search for:', query);
  axios.get(`${baseURL}/parks/search?q=${query}`)
    .then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        alert('Sorry, there is nothing that matches your search');
      } else {
        console.log(`Found:`, res.data);
        displayParks(res.data);
      }
    })
    .catch(err => console.log(err));
}