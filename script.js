const apiKey = "486b484a7bdcc06e24947c85859e7e44"; 
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const movieInfoDiv = document.getElementById("movie-info");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    // Step 1: Search for movie
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const movieId = data.results[0].id;

          // Step 2: Get full movie details
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=external_ids`)
            .then(response => response.json())
            .then(movie => {
              movieInfoDiv.innerHTML = `
                <h2>${movie.title} (${movie.release_date?.slice(0,4) || "N/A"})</h2>
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title} poster">
                <p><strong>Tagline:</strong> ${movie.tagline || "N/A"}</p>
                <p><strong>Overview:</strong> ${movie.overview || "No description available."}</p>
                <p><strong>Budget:</strong> $${movie.budget.toLocaleString()}</p>
                <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(", ")}</p>
                <p><strong>Language:</strong> ${movie.original_language}</p>
                <p><strong>All Titles:</strong> ${movie.original_title} / ${movie.title}</p>
                <p><strong>Popularity:</strong> ${movie.popularity}</p>
                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                <p><strong>Production Companies:</strong> ${movie.production_companies.map(pc => pc.name).join(", ")}</p>
                <p><strong>Production Countries:</strong> ${movie.production_countries.map(c => c.name).join(", ")}</p>
                <p><strong>IMDb Link:</strong> <a href="https://www.imdb.com/title/${movie.external_ids.imdb_id}" target="_blank">View on IMDb</a></p>
              `;
            });
        } else {
          movieInfoDiv.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        movieInfoDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
      });
  }
});
