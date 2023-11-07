window.addEventListener("load", () => {
  document.querySelector("header").classList.remove("header-fixed");

  document
    .querySelector("#search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      hidePlaceholderText();
      hideProductDetails();
      search();
    });

  document
    .getElementById("aboutUsSeite")
    .addEventListener("click", function (event) {
      event.preventDefault();
      clearPageContent();
      document.getElementById("aboutUs").style.display = "block";
      document.getElementById("impressum").style.display = "none";
      document.getElementById("placeholder-text").style.display = "none";
    });

  document
    .getElementById("impressumSeite")
    .addEventListener("click", function (event) {
      event.preventDefault();
      clearPageContent();
      document.getElementById("impressum").style.display = "block";
      document.getElementById("aboutUs").style.display = "none";
      document.getElementById("placeholder-text").style.display = "none";
    });

  function clearPageContent() {
    const content = document.getElementById("content");
    content.innerHTML = "";
    const produktDetails = document.getElementById("produktdetails");
    if (produktDetails) {
      produktDetails.style.display = "none";
    }
  }

  function hideProductDetails() {
    const productDetails = document.getElementById("produktdetails");
    if (productDetails) {
      productDetails.style.display = "none";
    }
  }

  function search() {
    const query = document.querySelector('input[name="search"]').value;
    const errorContainer = document.getElementById("error-message");

    if (query.length > 2) {
      fetchData(query);
      errorContainer.style.display = "none";
    } else {
      errorContainer.textContent =
        "Die Suchanfrage muss mindestens 3 Zeichen enthalten.";
      errorContainer.style.display = "block";
    }
  }

  function hidePlaceholderText() {
    const placeholderText = document.getElementById("placeholder-text");
    if (placeholderText) {
      placeholderText.style.display = "none";
    }
  }

  function fetchData(query) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";

    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.products &&
          data.products.length === 0 &&
          data.total === 0 &&
          data.skip === 0 &&
          data.limit === 0
        ) {
          2;
          resultsContainer.innerHTML = "Es wurde nichts gefunden.";
        } else {
          displayResults(data.products);
        }
      })
      .catch((error) => {
        console.error("Es gab einen Fehler beim Abrufen der Daten:", error);
      });
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById("search-results");
    const errorContainer = document.getElementById("error-message");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      errorContainer.textContent = "Es wurden keine Produkte gefunden.";
      errorContainer.style.display = "block";
    } else {
      errorContainer.style.display = "none";

      results.forEach((data) => {
        const card = document.createElement("div");
        card.classList.add();

        const cardHtml = `
          <div class="card" style="width: 18rem;">
            <figure>
              <img src="${
                data.thumbnail || "default-placeholder.jpg"
              }" class="card-img-top" alt="${data.title}">
            </figure>
                <div class="cardBody">
                  <h5 class="cardTitle">${data.title}</h5>
                </div>
                <div class="cardFooter">
                  <a href="index.html?id=${
                    data.id
                  }"class="buttonProduct">Details anzeigen</a>
                </div>
          </div>
          `;

        card.innerHTML = cardHtml;
        resultsContainer.appendChild(card);
      });
    }
  }
});
