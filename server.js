const express = require('express');
const https = require('https');
const querystring = require('querystring'); 
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server url is https://localhost:${PORT}`);
});

app.use(cors());

const API_KEY = "42079125-1909400cd5615db78c9c2cb93";
const baseURL = 'pixabay.com';

const getImage = async (req, res) => {
    const queryParams = {
        key: API_KEY, 
        q: req.query.q || 'nature'
    };

    const queryString = querystring.stringify(queryParams);

    const options = {
        hostname: baseURL,
        port: 443,
        path: `/api/?${queryString}`,
        method: 'GET'
    }

    
    https.get(options, (response) => {
        let data = ''; //hold JSON here
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send('Failed to fetch image');
            return;
        }

        response.on('data', (chunk) => {
            data += chunk; 
                });

        response.on('end', () => {
            try {
                const parsedData = JSON.parse(data); //Parse the JSON string into an object
                res.status(200).json(parsedData); //Send the parsed JSON back to the client
            } catch (error) {
                res.status(500).send('Failed to parse the image data');
            }});

    }).on('error', (error) => {
        console.error('Request error:', error); 
        res.status(500).send('An error occurred while fetching the image');
    });
};

app.get('/image', getImage);
