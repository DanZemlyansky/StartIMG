const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementsByClassName('searchBtn');
const resultContainer = document.getElementById('resultContainer');

//initialize search query as empty string
let searchQuery = '';

//handle the change in the input
searchBar.oninput = (e) => {   
    searchQuery = e.target.value;
}

searchBtn[0].addEventListener('click' , async () => {
//fetch when clicking the search button
let query = searchQuery;
try {
    const res = await fetch(`fetchUrl/${query}`)
    const data = await res.json();
    if(data){
        resultContainer.innerHTML += `<img class="image" src=${data.something} alt=${data.name}></img>`
        }
} catch (error) {
    console.error('Error fetching data:', error);
    resultContainer.innerHTML = '<p>Failed to load data. Please try again.</p>';
}})

//fetch a random selection of images on load
window.onload = async () => {
    try {
        const res = await fetch('fetchUrl/RANDOMquery')
        const data = await res.json();
    
    } catch (error) {
        console.error('Error fetching data:', error);
        resultContainer.innerHTML = '<p>Failed to load data. Please try again.</p>';
    
    }
}