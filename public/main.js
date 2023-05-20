const restContainer = document.querySelector('.restaurants-main');
const routesContainer = document.querySelector('.routes-main');
const parksContainer = document.querySelector('.parks-main');
const categoryDropdown = document.getElementById('category');
const linkInputContainer = document.getElementById('linkInputContainer');

categoryDropdown.addEventListener('change', function() {
  if (categoryDropdown.value === 'restaurants') {
    linkInputContainer.style.display = 'flex';
  } else {
    linkInputContainer.style.display = 'none';
  }
});

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

getRestaurants();
getRoutes();
getParks();