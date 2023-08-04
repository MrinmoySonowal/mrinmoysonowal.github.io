// script.js

// Sample data for the cards
const cardsData = [

    {
        imageUrl: "https://github.com/MrinmoySonowal/MrinmoySonowal/blob/main/grassmarket.jpg?raw=true",
        cardText: "Grassmarket, Edinburgh",
        buttonText: "View",
    },
    {
        imageUrl: "https://github.com/MrinmoySonowal/MrinmoySonowal/blob/main/St_abbs.jpg?raw=true",
        cardText: "St Abbs, Scotland",
        buttonText: "View",
    },
    {
        imageUrl: "https://github.com/MrinmoySonowal/MrinmoySonowal/blob/main/St_Andrews.jpg?raw=true",
        cardText: "St Andrews, Scotland",
        buttonText: "View",
    }
    // Add more card data here as needed
];

// Function to generate the HTML markup for a single card
function createCard(cardData) {
    return `
    <div class="col">
      <div class="card shadow-sm">
        <img src="${cardData.imageUrl}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="Thumbnail">
        <div class="card-body">
          <p class="card-text">${cardData.cardText}</p>
          <div class="d-flex justify-content-between align-items-center">
<!--            <div class="btn-group">-->
<!--              <button type="button" class="btn btn-sm btn-outline-secondary">${cardData.buttonText}</button>-->
<!--            </div>-->
<!--            <small class="text-body-secondary">9 mins</small>-->
          </div>
        </div>
      </div>
    </div>
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