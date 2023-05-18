require('dotenv').config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

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
                name varchar(255),
                image text,
                description text
            );

            create table parks (
                park_id serial primary key,
                name varchar(255),
                image text,
                description text
            );

            insert into restaurants (type, name, image, description, visit_link)
            values ('Cofee Shop', 'CUP OF JOE COFFEE CO', 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'Cup of Joe Coffee Company in Brooklyn is the ultimate coffee lovers paradise. Their skilled baristas make coffee thats unmatched in quality and taste. With a cozy atmosphere and friendly staff, you will feel right at home. They offer an extensive menu of drinks, from classic lattes to unique concoctions. It is no wonder why this coffee shop is a beloved spot for locals and visitors alike.', 'https://www.cupofjoecoffeeco.com'),
            ('Brunch hot spot', 'FIVE LEAVES', 'https://www.spendwithpennies.com/wp-content/uploads/2022/09/Avocado-Toast-SpendWithPennies-4.jpg', 'Five Leaves is the go-to brunch spot in Brooklyn with its cozy ambiance, friendly service and delicious food. Their famous ricotta pancakes and avocado toast are a must-try and the outdoor seating provides a perfect spot for people watching while sipping on their famous Bloody Mary. Five Leaves offers a unique and memorable dining experience that should not be missed.', 'https://fiveleavesny.com'),
            ('The best Eats', 'PANZON', 'https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_1200,ar_4:3,g_auto,f_auto/images/Smoked_Tinga_Tacos_-_Sam_Hillman_1_mjhatz', 'Panzon is the go-to spot in Brooklyn for authentic and delicious Mexican cuisine. From their perfectly cooked tacos and mouth-watering guacamole to their refreshing margaritas, Panzon has something for everyone. With its cozy atmosphere and friendly service, it is no wonder why it is a favorite among locals and visitors alike. Come for the food, stay for the experience.', 'https://www.panzonbk.com'),
            ('Date night', 'The RIVER CAFE', 'https://images.otstatic.com/prod/24902773/1/huge.jpg', 'The River Café in Brooklyn is the ultimate romantic date night spot with its breathtaking views of the Manhattan skyline and the Brooklyn Bridge. Its refined American cuisine, world-class wine selection, and elegant atmosphere create an unforgettable dining experience. Whether it is for a special occasion or just a night out with your loved one, The River Café is the perfect destination for a magical evening.', 'https://rivercafe.com'),
            ('Bets Roof Top', 'HARRIET''S ROOFTOP', 'https://www.opentable.com/blog/wp-content/uploads/sites/108/2019/06/blog-Osprey-Harriets-Rooftop-copy.jpeg', 'Harriet''s Rooftop, located at 1 Hotel Brooklyn Bridge, offers stunning views of the Manhattan skyline and the Brooklyn Bridge. With a chic and modern decor, this rooftop bar is the perfect spot for drinks and small bites. Whether you''re in the mood for a romantic evening or a night out with friends, Harriet''s Rooftop is one of the best places to experience the beauty of Brooklyn from a unique and elevated perspective.', 'https://www.1hotels.com/brooklyn-bridge/taste/harriets-rooftop?utm_source=google-gbp&utm_medium=organic&utm_campaign=gbp'),
            ('Bets Family Dining', 'SOTTOCASA PIZZERIA', 'https://www.recipetineats.com/wp-content/uploads/2020/05/Pizza-Crust-without-yeast_5-SQ.jpg', 'Sottocasa Pizzeria in Brooklyn is the ultimate family dining experience, featuring authentic Italian cuisine and a warm, inviting atmosphere. Their wood-fired pizzas are renowned for their crispy crusts and delicious toppings, while their extensive wine list caters to all palates. With attentive service and a lively ambiance, Sottocasa Pizzeria is the perfect place to gather with loved ones and enjoy a memorable meal together.', 'https://sottocasanyc.com'),
            ('Sweet Sanctuary', 'TAIYAKI NYC', 'https://images.squarespace-cdn.com/content/v1/57749e263e00be33b76c3777/1657921159328-DS2RVELGVK3KM8YMJ0BS/image-asset.jpeg', 'Taiyaki NYC in Brooklyn is a popular dessert spot known for their delicious Japanese-style fish-shaped cones filled with soft-serve ice cream. Their menu also features a variety of sweet and savory treats, including mochi waffles and matcha lattes. With a vibrant and colorful atmosphere, Taiyaki NYC is the perfect place to satisfy your sweet tooth and capture Instagram-worthy moments.', 'https://taiyakinyc.com');
            
            insert into routes (name, image, description)
            values ('BROOKLYN BRIDGE PROMENADE', 'https://www.tripsavvy.com/thmb/xwFkaiaz1uVVegJlmzMHDT1Fxwo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-544225630-5c2ba83bc9e77c00010a688c.jpg', 'The Brooklyn Bridge Promenade offers stunning views of the Manhattan skyline and the East River, while also allowing walkers to appreciate the architecture and history of the iconic Brooklyn Bridge. It is a great way to get some exercise, fresh air, and experience one of the most famous landmarks in New York City.');
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
    // createCity: (req, res) => {
    //     let { name, rating, countryId } = req.body;
    //     sequelize.query(`
    //         insert into cities (name, rating, country_id)
    //         values ('${name}', ${rating}, ${countryId});
    //     `).then((dbRes) => {
    //         res.status(200).send(dbRes[0])
    //     })
    //     .catch(err => console.log(err))
    // },
    // getCities: (req, res) => {
    //     sequelize.query(`
    //         select ct.city_id, ct.name city, ct.rating, c.country_id, c.name country
    //         from cities ct
    //         join countries c
    //         on ct.country_id = c.country_id
    //         order by rating desc
    //     `).then((dbRes) => {
    //         res.status(200).send(dbRes[0])
    //     })
    //     .catch(err => console.log(err))
    // },
    // deleteCity: (req, res) => {
    //     let { id } = req.params;
    //     sequelize.query(`
    //         delete from cities
    //         where city_id = ${id};
    //     `).then((dbRes) => {
    //         res.status(200).send(dbRes[0])
    //     })
    //     .catch(err => console.log(err))
    // }
}