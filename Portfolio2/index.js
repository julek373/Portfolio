window.addEventListener("load", () => {

  document.querySelector("header").classList.remove("header-fixed");

  document
    .querySelector("#search")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      hidePlaceholderText();
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
  }

  function search() {
    const query = document.querySelector('input[name="search"]').value;

    if (query && query.length > 2) {
      fetchData(query);
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
});
