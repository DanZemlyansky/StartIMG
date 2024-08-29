
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementsByClassName('searchBtn');
const resultContainer = document.getElementById('resultContainer');

const modalContainer = document.getElementById('modalContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');

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
        const res = await fetch(`http://localhost:3000/image`)
        const data = await res.json();
        if (data) {
            //reset the container
            resultContainer.innerHTML = '';



            data.hits.map((image) => (
                resultContainer.innerHTML +=
                `<div class="imageCardContainer">
                <div class="imageCardMain">
                 <img src="${image.largeImageURL}"class="imageCardImg" alt='something'></img>
                    <div class="hoverEffectContainer">
                        <div class="hoverItems">
                        <p>tags: ${image.tags}</p>
                        <button onclick="">favourite</button>
                    </div>
                </div>
                </div>
                </div>`
            ))
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
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


const closeModal = () => {
    modalContainer.style.display = 'none'

}

modalCloseBtn.addEventListener('click' , closeModal)

const openModal = (e) => {
    modalContainer.style.display = 'block'






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
 <img src="${image.largeImageURL}"class="imageCardImg" alt='something'></img>
    <div class="hoverEffectContainer">
        <div class="hoverItems">
        <p>tags: ${image.tags}</p>
        <button onclick="">favourite</button>
    </div>
</div>
</div>
</div>`
        ))

        const hoverEffect = document.querySelectorAll('.hoverEffectContainer'); // HTMLcollection of the elements.
        hoverEffect.forEach(element => {
            element.addEventListener('click', openModal)
        });


    } catch (error) {
        console.error('Error fetching data:', error);
        resultContainer.innerHTML = '<p>Failed to load data. Please try again.</p>';
    }
}




