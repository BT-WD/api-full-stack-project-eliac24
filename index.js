console.log("App loaded");

// Get elements FIRST
const lineContainer = document.getElementById("line-container");
const arrivalResults = document.getElementById("arrival-results");

// ===== Line Status =====
async function loadLineStatus() {
    const data = [
        { line: "A", status: "good" },
        { line: "B", status: "delay" },
        { line: "C", status: "bad" }
    ];

    lineContainer.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = `line-card ${item.status}`;
        div.textContent = item.line;
        lineContainer.appendChild(div);
    });
}

loadLineStatus();

// ===== Search Arrivals =====
document.getElementById("search-btn").addEventListener("click", () => {
    const station = document.getElementById("station-input").value;

    arrivalResults.innerHTML = `
        <p>Next trains at ${station}:</p>
        <ul>
            <li>2 min</li>
            <li>5 min</li>
            <li>9 min</li>
        </ul>
        <button id="save-btn">Save</button>
    `;

    // attach event AFTER rendering
    document.getElementById("save-btn").addEventListener("click", () => {
        saveFavorite(station);
    });
});

// ===== Favorites =====
function saveFavorite(station) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(station)) {
        favorites.push(station);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    displayFavorites();
}

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const container = document.getElementById("favorites-container");

    container.innerHTML = "";

    favorites.forEach(station => {
        const div = document.createElement("div");
        div.textContent = station;
        container.appendChild(div);
    });
}

displayFavorites();