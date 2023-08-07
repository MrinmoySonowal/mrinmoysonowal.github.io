// script.js

const cardsData = [

    {
        imageUrl: "https://onedrive.live.com/embed?resid=5A4235DE4996431D%2125389&authkey=%21AOYWWPoBpXfhvLE&width=3554&height=1999",
        cardText: "Assam, India",
    },
    {
        imageUrl: "https://onedrive.live.com/embed?resid=5A4235DE4996431D%2125273&authkey=%21ACuNaFcUuGdDCE8&width=4000&height=2252",
        cardText: "Edinburgh, Scotland",
    },
    {
        imageUrl: "https://github.com/MrinmoySonowal/MrinmoySonowal/blob/main/St_Andrews.jpg?raw=true",
        cardText: "St Andrews, Scotland",
    }
    // Add more card data here as needed
];

// Function to generate the HTML markup for a single card
function createCard(cardData) {
    return `
    <div class="col">
      <div class="card shadow-sm" data-bs-toggle="modal" data-bs-target="#imageModal" style="cursor: pointer" onclick="openPhotoViewer(this)">
        <img src="${cardData.imageUrl}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Thumbnail" >
        <div class="card-body">
          <p class="card-text">${cardData.cardText}</p>
        </div>
      </div>
    </div>
  `;
}

function openPhotoViewer(cardElement) {
    const modalBody = document.getElementById("imageModalBody");
    modalBody.innerHTML = `
    <img class="h-100 w-100" src="${cardElement.querySelector("img").src}" height="auto" alt="${cardElement.querySelector("p").innerHTML}">
    `;
    const modalHeader = document.getElementById("imageModalHeader");
    modalHeader.innerHTML = `
          <h5 class="w-100 h-90 modal-title" id="imageModalLabel">${cardElement.querySelector("p").innerHTML}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

}

// Function to generate all cards and append them to the card container
function generateCards() {
    const cardContainer = document.getElementById("card-container");

    // Loop through the cards data and generate HTML markup for each card
    let cardsHTML = "";
    for (const cardData of cardsData) {
        cardsHTML += createCard(cardData);
    }

    // Append the generated cards HTML to the card container
    cardContainer.innerHTML = cardsHTML;
}

// Call the function to generate the cards when the page loads
document.addEventListener("DOMContentLoaded", generateCards);