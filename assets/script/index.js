import movies from "./movies.js";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const autocompleteResults = document.getElementById("autocompleteResults");
  const movieDetails = document.getElementById("movieDetails");

  searchButton.addEventListener("click", function () {
    searchMovies();
  });
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchMovies();
    }
  });
  searchInput.addEventListener("input", function () {
    searchMovies();
  });

  function searchMovies() {
    const searchQuery = searchInput.value.toLowerCase();
    const matchedMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery)
    );
    displayAutocompleteResults(matchedMovies);
  }

  function displayAutocompleteResults(matchedMovies) {
    const datalist = document.getElementById("movieTitles");
    datalist.innerHTML = "";
    matchedMovies.forEach((movie) => {
      const option = document.createElement("option");
      option.value = movie.title;
      if (movie.title.toLowerCase() !== searchInput.value.toLowerCase()) {
        datalist.appendChild(option);
      }
      searchButton.addEventListener("click", function () {
        displayMovieDetails(movie);
      });
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          displayMovieDetails(movie);
        }
      });
      window.addEventListener(
        "input",
        function (e) {
          let event = e.inputType ? "input" : "datalist";

          if (event === "datalist") {
            displayMovieDetails(movie);
          }
        },
        false
      );
    });
  }
  function displayMovieDetails(movie) {
    let genres = '';
    movie.genre.forEach(singleGenre => {
      genres += `<span>${singleGenre}</span>`;
    });
    movieDetails.innerHTML = `
            <div class="movie-details-container">
                <div class="poster-container">
                    <img src="${movie.poster}" alt="${movie.title} Poster">
                </div>
                <div class="info-container">
                    <h3>${movie.title}</h3>
                    <p class="year-duration"> 
                  <span>${movie.year}</span>    <i class="fa-solid fa-circle fa-beat fa-2xs" style="color: #0213f7;"> </i>    <span>${movie.runningTime}</span>
                  </p>
                    <p class="description"> ${movie.description}</p>
                    <p class="genres flex"> ${genres}</p>
                </div>
            </div>
        `;
    autocompleteResults.innerHTML = "";
    searchInput.value = `${movie.title}`;
  }
});
