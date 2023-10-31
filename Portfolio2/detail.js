const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const apiUrl = `https://dummyjson.com/products/${productId}`;

// Daten aus API abrufen
fetch(apiUrl)
  .then((res) => res.json())
  .then((productDetails) => {
    displayProductDetails(productDetails);
    createImageSlider(productDetails.images);
    fetchSimilarProducts(productDetails.category);
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der Produktinformationen:", error);
  });

// Funktion zum Erstellen des Bildsliders
function createImageSlider(imageUrls) {
  const slider = document.getElementById("image-slider");
  let currentImageIndex = 0;

  imageUrls.forEach((imageUrl, index) => {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Produktbild";
    image.classList.add("slider-image");
    image.style.display = index === 0 ? "block" : "none"; // Nur das erste Bild anzeigen
    slider.appendChild(image);
  });

  function showNextImage() {
    const images = document.querySelectorAll(".slider-image");

    images[currentImageIndex].style.display = "none";

    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = "block";
  }

  const prevArrow = document.createElement("img");
  prevArrow.src = "img/leftArrow.svg";
  prevArrow.classList.add("slider-arrow");
  prevArrow.addEventListener("click", () => {
    showNextImage(-1);
  });

  const nextArrow = document.createElement("img");
  nextArrow.src = "img/rightArrow.svg";
  nextArrow.classList.add("slider-arrow");
  nextArrow.addEventListener("click", showNextImage);

  slider.appendChild(prevArrow);
  slider.appendChild(nextArrow);
}

function displayProductDetails(productDetails) {
  const productContainer = document.getElementById("product-details");

  const productHtml = `
        <h2>${productDetails.title}</h2>
        <p>${productDetails.description}</p>
        <p>Marke: ${productDetails.brand}</p>
        <p>Kategorie: ${productDetails.category}</p>
        <p>Preis: $${productDetails.price}</p>
        <p>Rabatt: ${productDetails.discountPercentage}%</p>
        <p>Bewertung: ${productDetails.rating}<img src="img/ratingStar.svg" height="20" width="20"></p>
        <p>Verfügbarkeit: ${productDetails.stock} Stück</p>
        <h3><u>Ähnliche Produkte:</u></h3>
        <!-- Weitere Produktinformationen hier einfügen -->
    `;

  productContainer.innerHTML = productHtml;
}

function fetchSimilarProducts(category) {
  const apiUrl = `https://dummyjson.com/products/category/${category}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fehler beim Abrufen der ähnlichen Produkte.");
      }
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data.products)) {
        displaySimilarProducts(data.products);
      } else {
        console.error("Ungültige API-Antwort für ähnliche Produkte:", data);
      }
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen ähnlicher Produkte:", error);
    });
}

function displaySimilarProducts(similarProducts) {
  const similarProductsContainer = document.getElementById(
    "similar-products-container"
  );
  similarProductsContainer.innerHTML = "";

  if (Array.isArray(similarProducts)) {
    similarProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add();

      const cardHtml = `
        <div class="card" style="width: 18rem;">
          <figure>
            <img src="${
              product.thumbnail || "default-placeholder.jpg"
            }" class="card-img-top" alt="${product.title}">
          </figure>
          <div class="cardBody">
            <h5 class="cardTitle">${product.title}</h5>
          </div>
          <div class="cardFooter">
            <a href="detail.html?id=${
              product.id
            }" class="buttonProduct">Details anzeigen</a>
          </div>
        </div>
        `;

      card.innerHTML = cardHtml;
      similarProductsContainer.appendChild(card);
    });
  } else {
    console.error("similarProducts ist kein Array.");
  }
}
