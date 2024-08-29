const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementsByClassName("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const modalContainer = document.getElementById("modalContainer");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const searchInput = document.getElementById('searchBar');
const loadBtn = document.getElementById("loadBtn");
const tagsContainer = document.getElementById('tagsContainer');
const hoverEffect = resultContainer.querySelectorAll(".hoverEffectContainer");

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
  "ocean", "pyramid", "quartz", "rainbow", "sunflower", "telephone", "universe", "volcano", "windmill", "x-ray",
  "startline"
];

const searchQuery = async (query) => {
    try {
      const res = await fetch(`http://localhost:3000/image?q=${query}`);
      const data = await res.json();
      if (data) {
        resultContainer.innerHTML = "";
        dataArray = [];
  
        data.hits.forEach((image) => {
          resultContainer.innerHTML += `
            <div class="imageCardContainer">
              <div class="imageCardMain">
                <img src="${image.largeImageURL}" class="imageCardImg" alt='something'>
                <div class="hoverEffectContainer">
                  <div class="hoverItems">
                    <p>tags: ${image.tags}</p>
                  </div>
                </div>
              </div>
            </div>`;
          dataArray.push(image);
        });
  
        setupModals();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  };
  

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  searchQuery(searchInput.value);
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
}


const setupModals = () => {
    const hoverEffects = resultContainer.querySelectorAll(".hoverEffectContainer");
    hoverEffects.forEach((element, index) => {
      element.addEventListener("click", () => {
        openModal(dataArray[index]);
      });
    });
  };
  


// Fetch a random selection of images on load
window.onload = async () => {
    try {
      const response = await fetch("http://localhost:3000/random-images");
      if (!response.ok) {
        resultContainer.innerHTML = "";
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const randomImages = shuffleArray(data.hits); // No need to slice since we get 10 images directly
      const randomTags = shuffleArray(randomTerms).slice(0, 7); // Get 7 random terms from the array
  
      randomTags.forEach((term) => {
        tagsContainer.innerHTML += `<button class="termBtn">${term}</button>`;
      });
  
      // Add event listener to the created tags
      const btns = document.querySelectorAll('.termBtn');
      btns.forEach((button) => {
        button.addEventListener('click', () => {
          searchQuery(button.textContent); // Pass the text content
        });
      });
  
      resultContainer.innerHTML = "";
      dataArray = []; // Reset dataArray
  
      randomImages.forEach((image) => {
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
        dataArray.push(image);
      });
  
      // Set up modals for random images
      setupModals();
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  };
  
// On call, call the server and load more images from the search result
const loadMoreImages = async () => {
    const currentQuery = searchBar.value;
    try {
      const response = await fetch(`http://localhost:3000/image?q=${currentQuery}`);
      if (!response.ok) {
        resultContainer.innerHTML = "";
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      data.hits.forEach((image) => {
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
        dataArray.push(image);
      });
  
      // Set up modals for newly added images
      setupModals();
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  };
  

loadBtn.addEventListener('click', loadMoreImages);
