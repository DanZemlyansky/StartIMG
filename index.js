const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const getImage = async (req ,res) => {

try {
  const response =  await fetch()

if (!response.ok)
    throw new Error('Failed to fetch image');
}

catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the image');}

}

app.get('/image', getImage);
