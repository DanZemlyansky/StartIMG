
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementsByClassName("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const modalContainer = document.getElementById("modalContainer");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const searchInput = document.getElementById('searchBar');
const loadBtn = document.getElementById("loadBtn");
const tagsContainer =document.getElementById('tagsContainer');
 

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

const searchQuery = async (query) => { 
    try {
      const res = await fetch(`http://localhost:3000/image?q=${query}`);
      const data = await res.json();
      if (data) {
        //reset the container
        resultContainer.innerHTML = "";
  
        data.hits.map(
          (image) =>
            (resultContainer.innerHTML += `<div class="imageCardContainer">
                  <div class="imageCardMain">
                   <img src="${image.largeImageURL}"class="imageCardImg" alt='something'>
                      <div class="hoverEffectContainer">
                          <div class="hoverItems">
                          <p>tags: ${image.tags}</p>
                          </div>
                          </div>
                          </div>
                          </div>`)
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  }
// pass directry the search query
searchBtn[0].addEventListener("click", () => {
    searchQuery(searchInput.value)
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const closeModal = () => {
  modalContainer.style.display = "none";
};

modalCloseBtn.addEventListener("click", closeModal);

let dataArray = [];

const openModal = (item) => {
  modalContainer.style.display = "flex";
  console.log(item);

  const modalContent = modalContainer.querySelector(".modalContent");
  modalContent.innerHTML = `
      <img src="${item.largeImageURL}" alt="${item.tags}">
      <p>Tags: ${item.tags}</p>
      <p>type: ${item.type}</p>
      <p>user: ${item.user}</p>
      <button>Favourite</button>
    `;
};
//fetch a random selection of images on load
window.onload = async () => {
  try {
    const response = await fetch("http://localhost:3000/random-images");

    if (!response.ok) {
      resultContainer.innerHTML = "";
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const randomImages = shuffleArray(data.hits); // Since we're requesting 10 images directly, no need to slice
     const randomTags = shuffleArray(randomTerms).slice(0,7) // Get 7 random terms from the array;

     randomTags.forEach((term) => {

        //create the tags
        tagsContainer.innerHTML += `<button class="termBtn">${term}</button>`



    })
    //add the event listener to the created tags
    const btns = document.querySelectorAll('.termBtn')
btns.forEach((button) => {
    button.addEventListener('click' , () => {searchQuery(button.textContent)}) // Pass the text content
})
    
    resultContainer.innerHTML = "";

    randomImages.forEach((image) => {
      dataArray.push(image);

      resultContainer.innerHTML += `
            <div class="imageCardContainer">
              <div class="imageCardMain">
                <img src="${image.largeImageURL}" class="imageCardImg" alt="something">
                <div class="hoverEffectContainer">
                  <div class="hoverItems">
                    <p>tags: ${image.tags}</p>
                  </div>
                </div>
              </div>
            </div>`;

      const hoverEffect = resultContainer.querySelectorAll(
        ".hoverEffectContainer"
      );
      hoverEffect.forEach((element, index) => {
        element.addEventListener("click", () => {
          openModal(randomImages[index]);
        });
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
  }
};

//on call call the server and load more images from the search result
const loadMoreImages = async () => {

//if there is a query use that for the results
    currentQuery = searchBar.value;
try {



    //if no query it will just return the random images
    const response = await fetch(`http://localhost:3000/image?q=${currentQuery}`);


    if (!response.ok) {
        resultContainer.innerHTML = "";
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

data.hits.map((image) => {


    resultContainer.innerHTML += `
    <div class="imageCardContainer">
      <div class="imageCardMain">
        <img src="${image.largeImageURL}" class="imageCardImg" alt="something">
        <div class="hoverEffectContainer">
          <div class="hoverItems">
            <p>tags: ${image.tags}</p>
          </div>
        </div>
      </div>
    </div>`;

})


} catch (error) {
    console.error("Error fetching data:", error);
    resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";

}



};


loadBtn.addEventListener('click' , loadMoreImages);