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
// usually would use env variables for this
const API_KEY = "42079125-1909400cd5615db78c9c2cb93";
const baseURL = 'pixabay.com';

const randomTerms = [
    "apple", "banana", "cat", "dog", "elephant", "flower", "giraffe", "hat", "ice", "jacket",
    "kite", "lion", "moon", "notebook", "orange", "penguin", "queen", "rose", "sun", "tree",
    "umbrella", "violin", "whale", "xylophone", "yacht", "zebra", "airplane", "book", "car", "dance",
    "engine", "fish", "grape", "house", "jelly", "key", "lamp", "mountain", "nut", "octopus",
    "pencil", "quilt", "rocket", "star", "train", "unicorn", "vase", "window", "yarn", "zoo",
    "acorn", "bicycle", "cloud", "diamond", "egg", "feather", "gold", "honey", "insect", "juice",
    "koala", "lemon", "mango", "noodle", "owl", "pearl", "quokka", "robot", "snow", "tiger",
    "umbrella", "van", "whistle", "xylophone", "yogurt", "zucchini", "ant", "beach", "coffee", "desk",
    "eagle", "flame", "guitar", "harp", "iceberg", "jar", "kangaroo", "lighthouse", "moonlight", "night",
    "ocean", "pyramid", "quartz", "rainbow", "sunflower", "telephone", "universe", "volcano", "windmill", "x-ray" , "startline"
];

const getImage = async (req, res) => {
    const queryParams = {
        key: API_KEY, 
        q: req.query.q || randomTerms[Math.floor(Math.random() * randomTerms.length)],
        per_page: req.query.per_page || 10 
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


const getRandomImages = async (req ,res) => {    try {
    //Call the getImage function with the `per_page` parameter set to 10
    req.query.per_page = 10;
    await getImage(req, res);
} catch (error) {
    res.status(500).send('An error occurred while fetching random images');
}
}


app.get('/image', getImage);
app.get('/random-images', getRandomImages);

