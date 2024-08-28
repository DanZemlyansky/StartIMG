const express = require('express');
const https = require('https');

const baseURL='https://pixabay.com/api/'

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const API_KEY = "42079125-1909400cd5615db78c9c2cb93";

const getImage = async (req ,res) => {
let data = {}; //expect object
try {
  const response = 
   https.get(`${baseURL}` , (res) => {
    if (response.statusCode !== 200) {
    res.status(response.statusCode).send('Failed to fetch image');
    return;
}


res.on('data' , (chunk) => {
    data = chunk;
})
//send data back with success code.
res.on('end' , () => {res.status(200).send(data)})})


}

catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the image');}

}

app.get('/image', getImage);

