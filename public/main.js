const restContainer = document.querySelector('.restaurants-main');
const routesContainer = document.querySelector('.routes-main');
const parksContainer = document.querySelector('.parks-main');
const categoryDropdown = document.querySelector('#category');
const linkInputContainer = document.querySelector('#linkInputContainer');
const form = document.querySelector('form');

function getRestaurants() {
    axios.get('http://localhost:4004/restaurants')
        .then(res => {
            res.data.forEach(restaurant => {
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
              
                restContainer.appendChild(div)
              });
              
        })
}

function getRoutes() {
    axios.get('http://localhost:4004/routes')
        .then(res => {
            res.data.forEach(route => {
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
              
                routesContainer.appendChild(div)
              });
              
        })
}

function getParks() {
    axios.get('http://localhost:4004/parks')
        .then(res => {
            res.data.forEach(park => {
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
              
                parksContainer.appendChild(div)
              });
              
        })
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
    : categoryDropdown.addEventListener('change', function() {
    if (categoryDropdown.value === 'restaurants') {
      linkInputContainer.style.display = 'flex';
    } else {
      linkInputContainer.style.display = 'none';
    }
  });

const formSubmit = (event) => {
    event.preventDefault();
  
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const link = document.getElementById('link').value;
  
    const formData = {
      category,
      type,
      name,
      description,
      image,
      link
    };
  
    console.log(formData);
  
    form.reset();
  }

  form === null || form === void 0
  ? void 0
  : form.addEventListener('submit', formSubmit);