// console.log("Je suis Marvel")


//import express from 'express';
import {getData} from './api.js';

import fastify from 'fastify';
import handlebars from 'handlebars';
import fastifyView from '@fastify/view';

// import dotenv from 'dotenv';

const PORT = 3000;

// dotenv.config();
// const app = fastify();
const app = fastify();
// const app = fastify({ logger: true });

// Register Handlebars as the view engine
app.register(fastifyView, {
    engine: {
        handlebars: handlebars
    },
    root: './templates',
    layout: 'index.hbs',

    options: {
        partials: {
            header: 'header.hbs',
            footer:
                'footer.hbs',
        }
    },

});

// Define a route to fetch Marvel API data and render the characters on the page
// app.get('/marvel-data', async (req, res) => {
app.get('/', async (req, res) => {
    try {
        const marvelEndpoint = 'https://gateway.marvel.com:443/v1/public/characters';
        const characters = await getData(marvelEndpoint);

        // Render the 'index.hbs' template with characters data
        // console.log(characters);
        return res.view('../templates/index.hbs', {characters});//return !!!!!
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// const app = express();

// Define a route to fetch Marvel API data
// app.get('/marvel-data', async (req, res) => {
//     const marvelEndpoint = 'https://gateway.marvel.com:443/v1/public/characters';
//
//     try {
//         // Fetch Marvel API data using getData function from api.js
//         const marvelData = await getData(marvelEndpoint);
//
//         // Send the fetched data as the response
//         res.json(marvelData);
//     } catch (error) {
//         console.error('Error in fetching Marvel data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Start the server
// app.listen(PORT,  () => {
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is running on port ${PORT}`);
});