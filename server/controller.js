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
            values ('Cofee Shop', 'CUP OF JOE COFFEE CO', 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'Cup of Joe Coffee Company in Brooklyn is the ultimate coffee lovers paradise. Their skilled baristas make coffee thats unmatched in quality and taste. With a cozy atmosphere and friendly staff, you will feel right at home. They offer an extensive menu of drinks, from classic lattes to unique concoctions. It is no wonder why this coffee shop is a beloved spot for locals and visitors alike.', 'https://www.cupofjoecoffeeco.com');
            
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