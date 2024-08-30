const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementsByClassName("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const modalContainer = document.getElementById("modalContainer");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const searchInput = document.getElementById("searchBar");
const loadBtn = document.getElementById("loadBtn");
const tagsContainer = document.getElementById("tagsContainer");
const hoverEffect = resultContainer.querySelectorAll(".hoverEffectContainer");
const imageColumns = document.querySelectorAll(".column");

const randomTerms = [
  "apple",
  "banana",
  "cat",
  "dog",
  "elephant",
  "flower",
  "giraffe",
  "hat",
  "ice",
  "jacket",
  "kite",
  "lion",
  "moon",
  "notebook",
  "orange",
  "penguin",
  "queen",
  "rose",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "whale",
  "xylophone",
  "yacht",
  "zebra",
  "airplane",
  "book",
  "car",
  "dance",
  "engine",
  "fish",
  "grape",
  "house",
  "jelly",
  "key",
  "lamp",
  "mountain",
  "nut",
  "octopus",
  "pencil",
  "quilt",
  "rocket",
  "star",
  "train",
  "unicorn",
  "vase",
  "window",
  "yarn",
  "zoo",
  "acorn",
  "bicycle",
  "cloud",
  "diamond",
  "egg",
  "feather",
  "gold",
  "honey",
  "insect",
  "juice",
  "koala",
  "lemon",
  "mango",
  "noodle",
  "owl",
  "pearl",
  "quokka",
  "robot",
  "snow",
  "tiger",
  "umbrella",
  "van",
  "whistle",
  "xylophone",
  "yogurt",
  "zucchini",
  "ant",
  "beach",
  "coffee",
  "desk",
  "eagle",
  "flame",
  "guitar",
  "harp",
  "iceberg",
  "jar",
  "kangaroo",
  "lighthouse",
  "moonlight",
  "night",
  "ocean",
  "pyramid",
  "quartz",
  "rainbow",
  "sunflower",
  "telephone",
  "universe",
  "volcano",
  "windmill",
  "x-ray",
  "start line",
];
let currentPage = 1;
const imageCounts = Array(imageColumns.length).fill(0);



const addImageToColumn = (image) => {
    // Find the column with the fewest images
    let minCount = Math.min(...imageCounts);
    let columnIndex = imageCounts.indexOf(minCount);

    // Create a unique ID for each image
    const imageId = `image-${Date.now()}-${Math.random()}`;

    const imageHTML = `
      <div class="imageCardContainer" data-image-id="${imageId}">
        <div class="imageCardMain">
          <img src="${image.largeImageURL}" class="imageCardImg" alt="${image.tags}">
          <div class="hoverEffectContainer">
            <div class="hoverItems">
              <div class="userData">
                <p class="userName">${image.user}</p>
                <img class="userIMG" src="${image.userImageURL}">
              </div>
              <button class='favouriteBtn' data-image-id="${imageId}">Favourite</button>
            </div>
          </div>
        </div>
      </div>`;

    imageColumns[columnIndex].insertAdjacentHTML('beforeend', imageHTML);
    imageCounts[columnIndex] += 1;

    // Store image data using the UID
    const imageCard = resultContainer.querySelector(`.imageCardContainer[data-image-id="${imageId}"]`);
    imageCard.dataset.image = JSON.stringify(image);
  };

  // UID approach to fix the data in the columns.
  const setupModals = () => {
    resultContainer.addEventListener("click", (event) => {
      // Check if the click target is a favourite button
      if (event.target.closest(".favouriteBtn")) {
        return; // Ignore clicks on favourite buttons
      }
  
      // Find the closest hoverEffectContainer
      const hoverEffectContainer = event.target.closest(".hoverEffectContainer");
      
      if (hoverEffectContainer) {
        // Find the closest imageCardContainer
        const imageCardContainer = hoverEffectContainer.closest(".imageCardContainer");
        // Get the image data from the dataset
        const imageData = JSON.parse(imageCardContainer.dataset.image);
        // Open the modal with the image data
        openModal(imageData);
      }
    });
  };
  
  
const searchQuery = async (query) => {
  try {
    const res = await fetch(`http://localhost:3000/image?q=${query}`);
    const data = await res.json();

    imageColumns.forEach((column) => (column.innerHTML = ""));
    imageCounts.fill(0);

    if (data) {
      dataArray = data.hits;
      data.hits.forEach((image) => {
        addImageToColumn(image);
      });

      setupModals(); // Call after images are added
    }
    currentPage = 1;
  } catch (error) {
    console.error("Error fetching data:", error);
    resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
  }
};


document.getElementById("searchForm").addEventListener("submit", function (e) {
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

const openModal = (item) => {
    modalContainer.style.display = "flex";
  
    const modalContent = modalContainer.querySelector(".modalContent");
    modalContent.innerHTML = `
      <img src="${item.largeImageURL}" alt="${item.tags}">
      <p>Tags: ${item.tags}</p>
      <p>Type: ${item.type}</p>
      <p>User: ${item.user}</p>
    `;
  };

  window.onload = async () => {    
    try {
      const response = await fetch("http://localhost:3000/random-images");
      if (!response.ok) {
        resultContainer.innerHTML = "";
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      const images = data.hits;
      const randomTags = shuffleArray(randomTerms).slice(0, 7);
  
      randomTags.forEach((term) => {
        tagsContainer.innerHTML += `<button class="termBtn">${term}</button>`;
      });
  
      const btns = document.querySelectorAll(".termBtn");
      btns.forEach((button) => {
        button.addEventListener("click", () => {
          searchQuery(button.textContent);
          searchInput.value = button.textContent;
        });
      });
  
      dataArray = [];
      images.forEach((image) => {
        addImageToColumn(image);
        dataArray.push(image);
      });
  
      setupModals(); 
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  };
  

const loadMoreImages = async () => {
  const currentQuery = searchBar.value;
  currentPage += 1;
  try {
    const response = await fetch(
      `http://localhost:3000/image?q=${currentQuery}&page=${currentPage}`
    );
    if (!response.ok) {
      resultContainer.innerHTML = "";
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (data.hits.length === 0) {
      console.log("No more images available.");
    }

    data.hits.forEach((image) => {
      addImageToColumn(image);
      dataArray.push(image);
    });
    setupModals();

  } catch (error) {
    console.error("Error fetching data:", error);
    resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
  }
};

loadBtn.addEventListener("click", loadMoreImages);
