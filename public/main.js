const restContainer = document.querySelector('.restaurants-main')

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
                image.alt = 'coffee cup picture';
              
                div.appendChild(typeDiv);
                div.appendChild(nameDiv);
                div.appendChild(description);
                div.appendChild(image);
              
                restContainer.appendChild(div)
              });
              
        })
}

getRestaurants();