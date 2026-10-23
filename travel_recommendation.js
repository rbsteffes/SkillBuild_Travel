let travelData = null;

// Fetch API data
fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => { travelData = data; })
  .catch(error => console.error("Error loading JSON:", error));

// Load into results div
function showPlaces(places) {
  const results = document.getElementById("results");
  results.innerHTML = "";
  for (const place of places) {
    results.innerHTML += `
      <div class="card">
        <img src="${place.imageUrl}" alt="${place.name}">
        <h2>${place.name}</h2>
        <p>${place.description}</p>
      </div>`;
  }
}

// Event listener for submit button
document.getElementById("searchBtn").addEventListener("click", (event) => {
  event.preventDefault();
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!travelData || keyword === "") return;

  if (keyword.includes("beach")) {
    showPlaces(travelData.beaches);
  } else if (keyword.includes("temple")) {
    showPlaces(travelData.temples);
  } else if (keyword.includes("countr")) {
    showPlaces(travelData.countries.flatMap(c => c.cities));
  } else {
    const country = travelData.countries.find(c => c.name.toLowerCase() === keyword);
    if (country) {
      showPlaces(country.cities);
    } else {
      document.getElementById("results").innerHTML = "<p>No results found.</p>";
    }
  }
});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
});