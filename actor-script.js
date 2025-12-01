const apiKey = "486b484a7bdcc06e24947c85859e7e44";
const actorSearchButton = document.getElementById("actor-search-button");
const actorSearchInput = document.getElementById("actor-search-input");
const actorPopup = document.getElementById("actor-popup"); // bottom popup container

// Reusable function
function runActorSearch(query) {
  if (!query) return;

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
            actorPopup.innerHTML = `
              <button id="close-popup" style="float:right;">✖</button>
              <h2>${actor.name}</h2>
              ${actor.profile_path ? `<img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}" style="width:100%;border-radius:4px;">` : ""}
              <p><strong>Biography:</strong> ${actor.biography || "No biography available."}</p>
              <p><strong>Birthday:</strong> ${actor.birthday || "N/A"}</p>
              <p><strong>Place of Birth:</strong> ${actor.place_of_birth || "N/A"}</p>
              <p><strong>IMDb:</strong> <a href="https://www.imdb.com/name/${actor.external_ids.imdb_id}" target="_blank">View on IMDb</a></p>
              <h3>Known For:</h3>
              <ul>
                ${actor.combined_credits.cast.slice(0,5).map(film => `
                  <li>${film.title || film.name} (${film.release_date?.slice(0,4) || "N/A"})</li>
                `).join("")}
              </ul>
            `;

            actorPopup.style.display = "block";

            // Close button functionality
            document.getElementById("close-popup").addEventListener("click", () => {
              actorPopup.style.display = "none";
            });
          });
      } else {
        actorPopup.innerHTML = "<p>No actor found.</p>";
        actorPopup.style.display = "block";
      }
    })
    .catch(error => {
      console.error("Error fetching actor data:", error);
      actorPopup.innerHTML = "<p>Something went wrong. Try again later.</p>";
      actorPopup.style.display = "block";
    });
}

// 🔎 Search button functionality
actorSearchButton.addEventListener("click", () => {
  runActorSearch(actorSearchInput.value.trim());
});

// 🎭 Example: clickable headshots
document.getElementById("billy-bob-thornton").addEventListener("click", () => {
  runActorSearch("Billy Bob Thornton");
});
document.getElementById("mary-steenburgen").addEventListener("click", () => {
  runActorSearch("Mary Steenburgen");
});
document.getElementById("daniel-davis").addEventListener("click", () => {
  runActorSearch("Daniel Davis");
});
document.getElementById("joey-lauren-adams").addEventListener("click", () => {
  runActorSearch("Joey Lauren Adams");
});
document.getElementById("natalie-canerday").addEventListener("click", () => {
  runActorSearch("Natalie Canerday");
});
document.getElementById("rodger-bumpass").addEventListener("click", () => {
  runActorSearch("Rodger Bumpass");
});
document.getElementById("tess-harper").addEventListener("click", () => {
  runActorSearch("Tess Harper");
});
document.getElementById("wes-bentley").addEventListener("click", () => {
  runActorSearch("Wes Bentley");
});