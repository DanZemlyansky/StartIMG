const { error } = require('console');
const express = require('express');
const https = require('https');


const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server url is https://localhost:${PORT}`);
});

const API_KEY = "42079125-1909400cd5615db78c9c2cb93";
const baseURL = 'pixabay.com'

const getImage = async (req, res) => {

    const options = {
        hostname: baseURL,
        port: 443,
        path: '/api/',
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    }
    let data = []; //hold data here
    try {
        https.get(options, (response) => {
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send('Failed to fetch image');
                return;
            }

            //add chunks to the data aray
            response.on('data', (chunk) => {
                data.push(chunk);
            })
        })

        response.on('end', () => {
            //combine data chunks and send them back
            const imageBuffer = Buffer.concat(data);
            res.status(200).send(imageBuffer);
        })
            .on('error', () => {
                console.error(error);
                res.status(500).send('An error occurred while fetching the image');
            })
    }

    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the image');
    }

}

app.get('/image', getImage);

