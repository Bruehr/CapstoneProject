const apiKey = "486b484a7bdcc06e24947c85859e7e44";
const actorSearchButton = document.getElementById("actor-search-button");
const actorSearchInput = document.getElementById("actor-search-input");
const actorInfoDiv = document.getElementById("actor-info");

actorSearchButton.addEventListener("click", () => {
  const query = actorSearchInput.value.trim();
  if (query) {
    // Step 1: Search for actor
    fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const actorId = data.results[0].id;

          // Step 2: Get full actor details + credits
          fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&append_to_response=combined_credits,external_ids`)
            .then(res => res.json())
            .then(actor => {
              actorInfoDiv.innerHTML = `
                <h2>${actor.name}</h2>
                ${actor.profile_path ? `<img src="https://image.tmdb.org/t/p/w300${actor.profile_path}" alt="${actor.name}">` : ""}
                
                <p><strong>Biography:</strong> ${actor.biography || "No biography available."}</p>
                <p><strong>Birthday:</strong> ${actor.birthday || "N/A"}</p>
                <p><strong>Deathday:</strong> ${actor.deathday || "Still living"}</p>
                <p><strong>Gender:</strong> ${actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "Other/Unknown"}</p>
                <p><strong>Place of Birth:</strong> ${actor.place_of_birth || "N/A"}</p>
                <p><strong>Fan Page:</strong> ${actor.homepage ? `<a href="${actor.homepage}" target="_blank">${actor.homepage}</a>` : "N/A"}</p>
                <p><strong>IMDb:</strong> <a href="https://www.imdb.com/name/${actor.external_ids.imdb_id}" target="_blank">View on IMDb</a></p>
                
                <h3>Known For:</h3>
                <ul>
                  ${actor.combined_credits.cast.slice(0,8).map(film => `
                    <li>
                      ${film.title || film.name} (${film.release_date?.slice(0,4) || "N/A"})
                      <a href="https://www.themoviedb.org/movie/${film.id}" target="_blank">More Info</a>
                    </li>
                  `).join("")}
                </ul>
              `;
            });
        } else {
          actorInfoDiv.innerHTML = "<p>No actor found.</p>";
        }
      })
      .catch(error => {
        console.error("Error fetching actor data:", error);
        actorInfoDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
      });
  }
});
