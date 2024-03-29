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
    autocompleteResults.innerHTML = "";
    matchedMovies.forEach((movie) => {
      const movieOption = document.createElement("div");
      movieOption.classList.add("autocomplete-option");
      movieOption.textContent = movie.title;
      movieOption.addEventListener("click", function () {
        displayMovieDetails(movie);
      });
      autocompleteResults.appendChild(movieOption);
    });
  }

  function displayMovieDetails(movie) {
    movieDetails.innerHTML = `
            <div class="movie-details-container">
                <div class="poster-container">
                    <img src="${movie.poster}" alt="${movie.title} Poster">
                </div>
                <div class="info-container">
                    <h2>${movie.title}</h2>
                    <p><strong>Year:</strong> ${movie.year}</p>
                    <p><strong>Running Time:</strong> ${movie.runningTime}</p>
                    <p><strong>Description:</strong> ${movie.description}</p>
                    <p><strong>Genre:</strong> ${movie.genre.join(", ")}</p>
                </div>
            </div>
        `;
  }
});
