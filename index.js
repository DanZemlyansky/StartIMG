const express = require('express');
const https = require('https');


const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const getImage = async (req ,res) => {

try {
  const response =  https.get(apiUrl , (response) => {if (response.statusCode !== 200) {
    res.status(response.statusCode).send('Failed to fetch image');
    return;
}})


}

catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the image');}

}

app.get('/image', getImage);
