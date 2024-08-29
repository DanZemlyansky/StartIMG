const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementsByClassName("searchBtn");
const resultContainer = document.getElementById("resultContainer");

const modalContainer = document.getElementById("modalContainer");
const modalCloseBtn = document.getElementById("modalCloseBtn");

const cardTemplate = `<div class="imageCardContainer">
<div class="imageCardMain">
 <img src=""class="imageCardImg" alt='something'></img>
    <div class="hoverEffectContainer">
        <div class="hoverItems">
        <p>somedata</p>
    </div>
</div>
</div>
</div>`;

//initialize search query as empty string
let searchQuery = "";
let currentQuery = "" //update when searching and then pass to load more function
//handle the change in the input
searchBar.oninput = (e) => {
  searchQuery = e.target.value;
};

searchBtn[0].addEventListener("click", async () => {
  //fetch when clicking the search button
  let query = searchQuery;
  try {
    const res = await fetch(`http://localhost:3000/image`);
    const data = await res.json();
    if (data) {
      //reset the container
      resultContainer.innerHTML = "";

      data.hits.map(
        (image) =>
          (resultContainer.innerHTML += `<div class="imageCardContainer">
                <div class="imageCardMain">
                 <img src="${image.largeImageURL}"class="imageCardImg" alt='something'></img>
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
  
      const random10 = shuffleArray(data.hits); // Since we're requesting 10 images directly, no need to slice
  
      resultContainer.innerHTML = "";
  
      random10.forEach((image) => {
        dataArray.push(image);
  
        resultContainer.innerHTML += `
            <div class="imageCardContainer">
              <div class="imageCardMain">
                <img src="${image.largeImageURL}" class="imageCardImg" alt="something"></img>
                <div class="hoverEffectContainer">
                  <div class="hoverItems">
                    <p>tags: ${image.tags}</p>
                  </div>
                </div>
              </div>
            </div>`;
  
        const hoverEffect = resultContainer.querySelectorAll(".hoverEffectContainer");
        hoverEffect.forEach((element, index) => {
          element.addEventListener("click", () => {
            openModal(random10[index]);
          });
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      resultContainer.innerHTML = "<p>Failed to load data. Please try again.</p>";
    }
  };

//make adding modal to searches easier
const addModal = (element) => {};

//on call call the server and load more images from the search result
const loadMoreImages = async () => {};
