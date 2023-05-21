const restContainer = document.querySelector('.restaurants-main');
const routesContainer = document.querySelector('.routes-main');
const parksContainer = document.querySelector('.parks-main');
const categoryDropdown = document.querySelector('#category');
const linkInputContainer = document.querySelector('#linkInputContainer');
const form = document.querySelector('form');

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
      name: name.value,
      description: description.value,
      image: image.value
    };
  } else {
    formData = {
      category: category.value,
      type: type.value,
      name: name.value,
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