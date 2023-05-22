require('dotenv').config();
const { CONNECTION_STRING, API_KEY } = process.env;
const axios = require('axios');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists restaurants;
            drop table if exists routes;
            drop table if exists parks;

            create table restaurants (
                restaurant_id serial primary key, 
                type varchar(255),
                name varchar(255),
                image text,
                description text,
                visit_link text
            );

            create table routes (
                route_id serial primary key,
                type varchar(255),
                name varchar(255),
                image text,
                description text
            );

            create table parks (
                park_id serial primary key,
                type varchar(255),
                name varchar(255),
                image text,
                description text
            );

            insert into restaurants (type, name, image, description, visit_link)
            values ('Coffee Shop', 'CUP OF JOE COFFEE CO', 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'Cup of Joe Coffee Company in Brooklyn is the ultimate coffee lovers paradise. Their skilled baristas make coffee thats unmatched in quality and taste. With a cozy atmosphere and friendly staff, you will feel right at home. They offer an extensive menu of drinks, from classic lattes to unique concoctions. It is no wonder why this coffee shop is a beloved spot for locals and visitors alike.', 'https://www.cupofjoecoffeeco.com'),
            ('Brunch Hot Spot', 'FIVE LEAVES', 'https://www.spendwithpennies.com/wp-content/uploads/2022/09/Avocado-Toast-SpendWithPennies-4.jpg', 'Five Leaves is the go-to brunch spot in Brooklyn with its cozy ambiance, friendly service and delicious food. Their famous ricotta pancakes and avocado toast are a must-try and the outdoor seating provides a perfect spot for people watching while sipping on their famous Bloody Mary. Five Leaves offers a unique and memorable dining experience that should not be missed.', 'https://fiveleavesny.com'),
            ('The Best Eats', 'PANZON', 'https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_1200,ar_4:3,g_auto,f_auto/images/Smoked_Tinga_Tacos_-_Sam_Hillman_1_mjhatz', 'Panzon is the go-to spot in Brooklyn for authentic and delicious Mexican cuisine. From their perfectly cooked tacos and mouth-watering guacamole to their refreshing margaritas, Panzon has something for everyone. With its cozy atmosphere and friendly service, it is no wonder why it is a favorite among locals and visitors alike. Come for the food, stay for the experience.', 'https://www.panzonbk.com'),
            ('Date Night', 'The RIVER CAFE', 'https://images.otstatic.com/prod/24902773/1/huge.jpg', 'The River Café in Brooklyn is the ultimate romantic date night spot with its breathtaking views of the Manhattan skyline and the Brooklyn Bridge. Its refined American cuisine, world-class wine selection, and elegant atmosphere create an unforgettable dining experience. Whether it is for a special occasion or just a night out with your loved one, The River Café is the perfect destination for a magical evening.', 'https://rivercafe.com'),
            ('Best Roof Top', 'HARRIET''S ROOFTOP', 'https://www.opentable.com/blog/wp-content/uploads/sites/108/2019/06/blog-Osprey-Harriets-Rooftop-copy.jpeg', 'Harriet''s Rooftop, located at 1 Hotel Brooklyn Bridge, offers stunning views of the Manhattan skyline and the Brooklyn Bridge. With a chic and modern decor, this rooftop bar is the perfect spot for drinks and small bites. Whether you''re in the mood for a romantic evening or a night out with friends, Harriet''s Rooftop is one of the best places to experience the beauty of Brooklyn from a unique and elevated perspective.', 'https://www.1hotels.com/brooklyn-bridge/taste/harriets-rooftop?utm_source=google-gbp&utm_medium=organic&utm_campaign=gbp'),
            ('Best Family Dining', 'SOTTOCASA PIZZERIA', 'https://www.recipetineats.com/wp-content/uploads/2020/05/Pizza-Crust-without-yeast_5-SQ.jpg', 'Sottocasa Pizzeria in Brooklyn is the ultimate family dining experience, featuring authentic Italian cuisine and a warm, inviting atmosphere. Their wood-fired pizzas are renowned for their crispy crusts and delicious toppings, while their extensive wine list caters to all palates. With attentive service and a lively ambiance, Sottocasa Pizzeria is the perfect place to gather with loved ones and enjoy a memorable meal together.', 'https://sottocasanyc.com'),
            ('Sweet Sanctuary', 'TAIYAKI NYC', 'https://images.squarespace-cdn.com/content/v1/57749e263e00be33b76c3777/1657921159328-DS2RVELGVK3KM8YMJ0BS/image-asset.jpeg', 'Taiyaki NYC in Brooklyn is a popular dessert spot known for their delicious Japanese-style fish-shaped cones filled with soft-serve ice cream. Their menu also features a variety of sweet and savory treats, including mochi waffles and matcha lattes. With a vibrant and colorful atmosphere, Taiyaki NYC is the perfect place to satisfy your sweet tooth and capture Instagram-worthy moments.', 'https://taiyakinyc.com');
            
            insert into routes (type, name, image, description)
            values ('City View Walks', 'BROOKLYN BRIDGE PROMENADE', 'https://www.tripsavvy.com/thmb/xwFkaiaz1uVVegJlmzMHDT1Fxwo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-544225630-5c2ba83bc9e77c00010a688c.jpg', 'The Brooklyn Bridge Promenade offers stunning views of the Manhattan skyline and the East River, while also allowing walkers to appreciate the architecture and history of the iconic Brooklyn Bridge. It is a great way to get some exercise, fresh air, and experience one of the most famous landmarks in New York City.'),
            ('Ocean View Walks', 'CONEY ISLAND BOARDWALK', 'https://www.archpaper.com/wp-content/uploads/2021/11/enzo-tica-eszYwTpr7m4-unsplash-1280x853.jpg', 'The Coney Island Boardwalk is a historic boardwalk that runs along the beach and offers stunning views of the Atlantic Ocean. It has an amusement park rides, and various food stands. It''s a great place for a leisurely walk, people watching, and enjoying the lively atmosphere of this iconic New York City destination.'),
            ('Urban Walks', 'BUSHWICK STREET ART WALK', 'https://miro.medium.com/v2/resize:fit:1200/1*0qAJBS_QEWYYjIw9nP2gjg.jpeg', 'Bushwick is a neighborhood in Brooklyn known for its vibrant street art scene. Taking a walk through the streets of Bushwick is a great way to discover some amazing murals, graffiti and art installations. The Bushwick Collective, a group of street artists who have transformed the neighborhood''s walls into an outdoor art gallery.');

            insert into parks (type, name, image, description)
            values ('Tranquil Strolls', 'PROSPECT PARK', 'https://imgs.6sqft.com/wp-content/uploads/2017/06/19174904/prospectpark-1024x654.jpg', 'Prospect Park is a 585-acre park and one of the largest in Brooklyn. It offers a wide range of activities, including biking, hiking, picnicking, and sports. It also features the Brooklyn Botanic Garden and the Prospect Park Zoo.'),
            ('Leisurely Walk with The City View', 'BROOKLYN BRIDGE PARK', 'https://media.timeout.com/images/105683556/image.jpg', 'This waterfront park stretches for 1.3 miles along the East River and offers stunning views of the Manhattan skyline. It features several piers with recreational activities, including a beach, volleyball courts, and a roller skating rink.'),
            ('Iconic Sunset Walk', 'SHORE ROAD PARK', 'https://www.nycgovparks.org/pagefiles/124/shore-road-parkway-sunset__5a849208a468e.jpg', 'Shore Road Park is a waterfront park located in the Bay Ridge neighborhood of Brooklyn. It offers stunning views of the New York Harbor and the Verrazzano-Narrows Bridge. The park features a playground, bike path, fitness area and more.');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200);
        }).catch(err => console.log('error seeding DB', err));
    },
    getRestaurants: (req, res) => {
        sequelize.query(`
            select *
            from restaurants;
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
            .catch(err => console.log(err))
    },
    getRoutes: (req, res) => {
        sequelize.query(`
            select *
            from routes;
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
            .catch(err => console.log(err))
    },
    getParks: (req, res) => {
        sequelize.query(`
            select *
            from parks;
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
            .catch(err => console.log(err))
    },
    createPost: (req, res) => {
        let { category, type, name, description, image, link } = req.body;
        if (category === 'restaurants') {
            sequelize.query(`
            insert into restaurants (type, name, description, image, visit_link)
            values ('${type}', '${name}', '${description}', '${image}', '${link}')
        `).then(dbRes => {
                console.log(dbRes[0]);
                res.sendStatus(200);
            })
                .catch(err => console.log(err))
        } else if (category === 'walking_routes') {
            sequelize.query(`
                    insert into routes (type, name, description, image)
                    values ('${type}', '${name}', '${description}', '${image}')
                    `).then(dbRes => {
                console.log(dbRes[0]);
                res.sendStatus(200);
            })
                .catch(err => console.log(err))
        } else if (category === 'parks') {
            sequelize.query(`
                    insert into parks (type, name, description, image)
                    values ('${type}', '${name}', '${description}', '${image}')
                    `).then(dbRes => {
                console.log(dbRes[0]);
                res.sendStatus(200);
            })
                .catch(err => console.log(err))
        }
    },
    getWeather: (req, res) => {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=11214&days=1&aqi=no&alerts=no`)
            .then((response) => {
                res.status(200).send(response.data);
            })
            .catch(err => console.log(err))
    },
    searchRestaurants: (req, res) => {
        let query = req.query.q;
        sequelize.query(`
            select *
            from restaurants
            where type like '%${query}%' or name like '%${query}%' or description like '%${query}%';
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
            .catch(err => console.log(err))
    }
}