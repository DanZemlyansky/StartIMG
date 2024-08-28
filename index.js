
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementsByClassName('searchBtn');
const resultContainer = document.getElementById('resultContainer');
const cardTemplate =
    `<div class="imageCardContainer">
<div class="imageCardMain">
 <img src=""class="imageCardImg" alt='something'></img>
    <div class="hoverEffectContainer">
        <div class="hoverItems">
        <p>somedata</p>
        <button onclick="">favourite</button>
    </div>
</div>
</div>
</div>`;


//initialize search query as empty string
let searchQuery = '';

//handle the change in the input
searchBar.oninput = (e) => {
    searchQuery = e.target.value;
}

searchBtn[0].addEventListener('click', async () => {
    //fetch when clicking the search button
    let query = searchQuery;
    try {
        const res = await fetch(`fetchUrl/${query}`)
        const data = await res.json();
        if (data) {
            resultContainer.innerHTML +=
                `<div class="imageCardContainer">
                <div class="imageCardMain">
                 <img src=""class="imageCardImg" alt='something'></img>
                    <div class="hoverEffectContainer">
                        <div class="hoverItems">
                        <p>somedata</p>
                        <button onclick="">favourite</button>
                    </div>
             </div>
            </div>
        </div>`
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
        resultContainer.innerHTML = '<p>Failed to load data. Please try again.</p>';
    }
})


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], [array[j]] = [array[j], array[i]]];
    }
    return array
}

//fetch a random selection of images on load
window.onload = async () => {
    try {
        const response = await fetch('http://localhost:3000/image');

        if (!response.ok) {
            resultContainer.innerHTML = '';
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // shuffle the array and get 10 elements
        const random10 = shuffleArray(data.hits.slice(0, 10));
        console.log(data);

        random10.map((image) => (

            resultContainer.innerHTML +=
            `<div class="imageCardContainer">
<div class="imageCardMain">
 <img src="${image.previewURL}"class="imageCardImg" alt='something'></img>
    <div class="hoverEffectContainer">
        <div class="hoverItems">
        <p>tags: ${image.tags}</p>
        <button onclick="">favourite</button>
    </div>
</div>
</div>
</div>`))


    } catch (error) {
        console.error('Error fetching data:', error);
        resultContainer.innerHTML = '<p>Failed to load data. Please try again.</p>';

    }
}