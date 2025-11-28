const apiKey = "486b484a7bdcc06e24947c85859e7e44";
const movieSearchButton = document.getElementById("movie-search-button");
const movieSearchInput = document.getElementById("movie-search-input");
const movieInfoDiv = document.getElementById("movie-info");

// Reusable function to run the movie search
function runMovieSearch(query) {
  if (query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const movieId = data.results[0].id;

          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,external_ids`)
            .then(res => res.json())
            .then(movie => {
              movieInfoDiv.innerHTML = `
                <h2>${movie.title} (${movie.release_date?.slice(0,4) || "N/A"})</h2>
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title} poster">
                <p><strong>Tagline:</strong> ${movie.tagline || "N/A"}</p>
                <p><strong>Overview:</strong> ${movie.overview || "No description available."}</p>
                <p><strong>Budget:</strong> $${movie.budget?.toLocaleString() || "N/A"}</p>
                <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(", ")}</p>
                <p><strong>Language:</strong> ${movie.original_language}</p>
                <p><strong>All Titles:</strong> ${movie.original_title} / ${movie.title}</p>
                <p><strong>Popularity:</strong> ${movie.popularity}</p>
                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                <p><strong>Production Companies:</strong> ${movie.production_companies.map(pc => pc.name).join(", ")}</p>
                <p><strong>Production Countries:</strong> ${movie.production_countries.map(c => c.name).join(", ")}</p>
                <p><strong>IMDb Link:</strong> <a href="https://www.imdb.com/title/${movie.external_ids.imdb_id}" target="_blank">View on IMDb</a></p>
                
                <h3>Cast:</h3>
                <ul>
                  ${movie.credits.cast.slice(0,10).map(actor => `
                    <li>
                      <a href="https://www.themoviedb.org/person/${actor.id}" target="_blank">
                        ${actor.name}
                      </a> as ${actor.character || "N/A"}
                    </li>
                  `).join("")}
                </ul>
              `;
            });
        } else {
          movieInfoDiv.innerHTML = "<p>No movie found.</p>";
        }
      })
      .catch(error => {
        console.error("Error fetching movie data:", error);
        movieInfoDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
      });
  }
}

// Run search when clicking the button
movieSearchButton.addEventListener("click", () => {
  runMovieSearch(movieSearchInput.value.trim());
});

// Run search when clicking posters
document.getElementById("slingblade").addEventListener("click", () => {
  runMovieSearch("Sling Blade");
});

document.getElementById("chrystal").addEventListener("click", () => {
  runMovieSearch("Chrystal");
});

document.getElementById("mud").addEventListener("click", () => {
  runMovieSearch("Mud");
});

document.getElementById("americanMade").addEventListener("click", () => {
  runMovieSearch("American Made");
});


document.getElementById("trueGrit").addEventListener("click", () => {
  runMovieSearch("True Grit");
});

document.getElementById("walkTheLine").addEventListener("click", () => {
  runMovieSearch("Walk the Line");
});

document.getElementById("arkansas").addEventListener("click", () => {
  runMovieSearch("arkansas");
});

document.getElementById("brubaker").addEventListener("click", () => {
  runMovieSearch("brubaker");
});

