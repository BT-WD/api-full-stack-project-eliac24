console.log("JS loaded");

// ── ELEMENTS (your originals kept) ──
const lineContainer  = document.getElementById("line-container");
const arrivalResults = document.getElementById("arrival-results");


const LINE_COLORS = {
  "1":"#EE352E","2":"#EE352E","3":"#EE352E",
  "4":"#00933C","5":"#00933C","6":"#00933C",
  "7":"#B933AD",
  "A":"#2850AD","C":"#2850AD","E":"#2850AD",
  "B":"#FF6319","D":"#FF6319","F":"#FF6319","M":"#FF6319",
  "G":"#6CBE45",
  "J":"#996633","Z":"#996633",
  "L":"#A7A9AC",
  "N":"#FCCC0A","Q":"#FCCC0A","R":"#FCCC0A","W":"#FCCC0A",
  "S":"#808183",
};
const LINE_TEXT = { "N":"#000","Q":"#000","R":"#000","W":"#000" };

function lineStyle(line) {
  return `background:${LINE_COLORS[line]||"#444"};color:${LINE_TEXT[line]||"#fff"}`;
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2500);
}

const STATION_DATA = {
  // ── MANHATTAN ──
  "times sq-42 st":       { lines:["1","2","3","7","A","C","E","N","Q","R","W","S"], borough:"Manhattan" },
  "times sq":             { lines:["1","2","3","7","A","C","E","N","Q","R","W","S"], borough:"Manhattan" },
  "42 st":                { lines:["1","2","3","7","A","C","E","N","Q","R","W","S"], borough:"Manhattan" },
  "grand central":        { lines:["4","5","6","7","S"],                             borough:"Manhattan" },
  "grand central-42 st":  { lines:["4","5","6","7","S"],                             borough:"Manhattan" },
  "union sq":             { lines:["4","5","6","L","N","Q","R","W"],                  borough:"Manhattan" },
  "14 st-union sq":       { lines:["4","5","6","L","N","Q","R","W"],                  borough:"Manhattan" },
  "canal st":             { lines:["A","C","E","J","N","Q","R","Z","6"],              borough:"Manhattan" },
  "fulton st":            { lines:["2","3","4","5","A","C","J","Z"],                  borough:"Manhattan" },
  "chambers st":          { lines:["1","2","3","A","C","J","Z"],                      borough:"Manhattan" },
  "34 st-herald sq":      { lines:["B","D","F","M","N","Q","R","W"],                  borough:"Manhattan" },
  "34 st-penn station":   { lines:["1","2","3","A","C","E"],                          borough:"Manhattan" },
  "penn station":         { lines:["1","2","3","A","C","E"],                          borough:"Manhattan" },
  "59 st-columbus circle":{ lines:["1","A","B","C","D"],                              borough:"Manhattan" },
  "columbus circle":      { lines:["1","A","B","C","D"],                              borough:"Manhattan" },
  "86 st":                { lines:["4","5","6"],                                      borough:"Manhattan" },
  "72 st":                { lines:["1","2","3","B","C"],                              borough:"Manhattan" },
  "96 st":                { lines:["1","2","3","B","C"],                              borough:"Manhattan" },
  "125 st":               { lines:["2","3","4","5","6","A","B","C","D"],              borough:"Manhattan" },
  "145 st":               { lines:["3","A","B","C","D"],                              borough:"Manhattan" },
  "168 st":               { lines:["1","A","C"],                                      borough:"Manhattan" },
  "181 st":               { lines:["1","A"],                                          borough:"Manhattan" },
  "dyckman st":           { lines:["1","A"],                                          borough:"Manhattan" },
  "207 st":               { lines:["A"],                                              borough:"Manhattan" },
  "inwood-207 st":        { lines:["A"],                                              borough:"Manhattan" },
  "14 st":                { lines:["1","2","3","F","L","M"],                          borough:"Manhattan" },
  "23 st":                { lines:["1","6","F","M","N","R","W"],                      borough:"Manhattan" },
  "28 st":                { lines:["1","6","N","R","W"],                              borough:"Manhattan" },
  "33 st":                { lines:["6"],                                              borough:"Manhattan" },
  "51 st":                { lines:["6"],                                              borough:"Manhattan" },
  "lexington av-53 st":   { lines:["E","M"],                                          borough:"Manhattan" },
  "lexington av-59 st":   { lines:["4","5","6","N","R","W"],                          borough:"Manhattan" },
  "5 av-59 st":           { lines:["N","R","W"],                                      borough:"Manhattan" },
  "57 st-7 av":           { lines:["N","Q","R","W"],                                  borough:"Manhattan" },
  "49 st":                { lines:["N","Q","R","W"],                                  borough:"Manhattan" },
  "bleecker st":          { lines:["4","6","B","D","F","M"],                          borough:"Manhattan" },
  "broadway-lafayette":   { lines:["B","D","F","M"],                                  borough:"Manhattan" },
  "spring st":            { lines:["4","6","C","E"],                                  borough:"Manhattan" },
  "houston st":           { lines:["1"],                                              borough:"Manhattan" },
  "christopher st":       { lines:["1"],                                              borough:"Manhattan" },
  "w 4 st":               { lines:["A","B","C","D","E","F","M"],                      borough:"Manhattan" },
  "west 4 st":            { lines:["A","B","C","D","E","F","M"],                      borough:"Manhattan" },
  "8 st-nyu":             { lines:["N","R","W"],                                      borough:"Manhattan" },
  "astor pl":             { lines:["6"],                                              borough:"Manhattan" },
  "city hall":            { lines:["R","W"],                                          borough:"Manhattan" },
  "rector st":            { lines:["1","R","W"],                                      borough:"Manhattan" },
  "wall st":              { lines:["2","3","4","5"],                                  borough:"Manhattan" },
  "bowling green":        { lines:["4","5"],                                          borough:"Manhattan" },
  "whitehall st":         { lines:["R","W"],                                          borough:"Manhattan" },
  "south ferry":          { lines:["1"],                                              borough:"Manhattan" },
  "world trade center":   { lines:["E"],                                              borough:"Manhattan" },
  "cortlandt st":         { lines:["1","R","W"],                                      borough:"Manhattan" },
  "park pl":              { lines:["2","3"],                                          borough:"Manhattan" },
  "brooklyn bridge":      { lines:["4","5","6","J","Z"],                              borough:"Manhattan" },
  "brooklyn bridge-city hall": { lines:["4","5","6","J","Z"],                         borough:"Manhattan" },
  "8 av":                 { lines:["L"],                                              borough:"Manhattan" },
  "6 av":                 { lines:["F","L","M"],                                      borough:"Manhattan" },
  "1 av":                 { lines:["L"],                                              borough:"Manhattan" },
  "3 av":                 { lines:["L"],                                              borough:"Manhattan" },
  "2 av":                 { lines:["F"],                                              borough:"Manhattan" },

  // ── BROOKLYN ──
  "atlantic av":              { lines:["2","3","4","5","B","D","N","Q","R"],           borough:"Brooklyn" },
  "atlantic av-barclays ctr": { lines:["2","3","4","5","B","D","N","Q","R"],           borough:"Brooklyn" },
  "barclays":                 { lines:["2","3","4","5","B","D","N","Q","R"],           borough:"Brooklyn" },
  "jay st-metrotech":         { lines:["A","C","F","R"],                               borough:"Brooklyn" },
  "jay st":                   { lines:["A","C","F","R"],                               borough:"Brooklyn" },
  "dekalb av":                { lines:["B","D","N","Q","R"],                           borough:"Brooklyn" },
  "flatbush av":              { lines:["2","5"],                                       borough:"Brooklyn" },
  "flatbush av-brooklyn college": { lines:["2","5"],                                  borough:"Brooklyn" },
  "borough hall":             { lines:["2","3","4","5","R"],                           borough:"Brooklyn" },
  "hoyt st":                  { lines:["2","3"],                                       borough:"Brooklyn" },
  "nevins st":                { lines:["2","3","4","5"],                               borough:"Brooklyn" },
  "bergen st":                { lines:["2","3"],                                       borough:"Brooklyn" },
  "grand army plaza":         { lines:["2","3"],                                       borough:"Brooklyn" },
  "eastern pkwy":             { lines:["2","3"],                                       borough:"Brooklyn" },
  "crown hts-utica av":       { lines:["3","4"],                                       borough:"Brooklyn" },
  "utica av":                 { lines:["3","4"],                                       borough:"Brooklyn" },
  "new lots av":              { lines:["3"],                                           borough:"Brooklyn" },
  "canarsie":                 { lines:["L"],                                           borough:"Brooklyn" },
  "canarsie-rockaway pkwy":   { lines:["L"],                                           borough:"Brooklyn" },
  "bedford av":               { lines:["L"],                                           borough:"Brooklyn" },
  "lorimer st":               { lines:["L"],                                           borough:"Brooklyn" },
  "myrtle-wyckoff":           { lines:["L","M"],                                       borough:"Brooklyn" },
  "church av":                { lines:["B","Q"],                                       borough:"Brooklyn" },
  "kings hwy":                { lines:["B","Q"],                                       borough:"Brooklyn" },
  "sheepshead bay":           { lines:["B","Q"],                                       borough:"Brooklyn" },
  "brighton beach":           { lines:["B","Q"],                                       borough:"Brooklyn" },
  "coney island":             { lines:["D","F","N","Q"],                               borough:"Brooklyn" },
  "coney island-stillwell av":{ lines:["D","F","N","Q"],                               borough:"Brooklyn" },
  "stillwell av":             { lines:["D","F","N","Q"],                               borough:"Brooklyn" },
  "bay ridge":                { lines:["R"],                                           borough:"Brooklyn" },
  "bay ridge-95 st":          { lines:["R"],                                           borough:"Brooklyn" },
  "4 av-9 st":                { lines:["F","G","R"],                                   borough:"Brooklyn" },
  "smith-9 sts":              { lines:["F","G"],                                       borough:"Brooklyn" },
  "carroll st":               { lines:["F","G"],                                       borough:"Brooklyn" },
  "7 av":                     { lines:["B","Q"],                                       borough:"Brooklyn" },
  "prospect park":            { lines:["B","Q","S"],                                   borough:"Brooklyn" },
  "park slope":               { lines:["B","Q"],                                       borough:"Brooklyn" },
  "fulton st (brooklyn)":     { lines:["A","C","G"],                                   borough:"Brooklyn" },
  "broadway junction":        { lines:["A","C","J","L","Z"],                           borough:"Brooklyn" },
  "halsey st":                { lines:["J","Z"],                                       borough:"Brooklyn" },
  "gates av":                 { lines:["J","Z"],                                       borough:"Brooklyn" },
  "bushwick av":              { lines:["J","Z"],                                       borough:"Brooklyn" },
  "atlantic av (j)":          { lines:["J","Z"],                                       borough:"Brooklyn" },
  "myrtle av":                { lines:["J","M","Z"],                                   borough:"Brooklyn" },
  "flushing av":              { lines:["G","J","M"],                                   borough:"Brooklyn" },
  "court sq":                 { lines:["E","G","M","7"],                               borough:"Queens"   },

  // ── QUEENS ──
  "jackson hts":              { lines:["E","F","M","R","7"],                           borough:"Queens" },
  "jackson hts-roosevelt av": { lines:["E","F","M","R","7"],                           borough:"Queens" },
  "roosevelt av":             { lines:["E","F","M","R","7"],                           borough:"Queens" },
  "jamaica":                  { lines:["E","J","Z"],                                   borough:"Queens" },
  "jamaica-179 st":           { lines:["F"],                                           borough:"Queens" },
  "jamaica center":           { lines:["E","J","Z"],                                   borough:"Queens" },
  "flushing":                 { lines:["7"],                                           borough:"Queens" },
  "flushing-main st":         { lines:["7"],                                           borough:"Queens" },
  "main st":                  { lines:["7"],                                           borough:"Queens" },
  "forest hills":             { lines:["E","F","M","R"],                               borough:"Queens" },
  "forest hills-71 av":       { lines:["E","F","M","R"],                               borough:"Queens" },
  "woodhaven blvd":           { lines:["J","Z"],                                       borough:"Queens" },
  "howard beach":             { lines:["A"],                                           borough:"Queens" },
  "ozone park":               { lines:["A"],                                           borough:"Queens" },
  "far rockaway":             { lines:["A"],                                           borough:"Queens" },
  "rockaway park":            { lines:["A","S"],                                       borough:"Queens" },
  "laguardia":                { lines:["Q70"],                                         borough:"Queens" },
  "queensboro plaza":         { lines:["N","W","7"],                                   borough:"Queens" },
  "astoria":                  { lines:["N","W"],                                       borough:"Queens" },
  "astoria-ditmars blvd":     { lines:["N","W"],                                       borough:"Queens" },
  "ditmars":                  { lines:["N","W"],                                       borough:"Queens" },
  "sutphin blvd":             { lines:["E","J","Z"],                                   borough:"Queens" },
  "mets-willets pt":          { lines:["7"],                                           borough:"Queens" },
  "junction blvd":            { lines:["7"],                                           borough:"Queens" },

  // ── BRONX ──
  "161 st-yankee stadium":    { lines:["4","B","D"],                                   borough:"Bronx" },
  "yankee stadium":           { lines:["4","B","D"],                                   borough:"Bronx" },
  "149 st-grand concourse":   { lines:["2","4","5"],                                   borough:"Bronx" },
  "fordham rd":               { lines:["4","B","D"],                                   borough:"Bronx" },
  "bedford park blvd":        { lines:["4","B","D"],                                   borough:"Bronx" },
  "woodlawn":                 { lines:["4"],                                           borough:"Bronx" },
  "wakefield":                { lines:["2","5"],                                       borough:"Bronx" },
  "pelham bay park":          { lines:["6"],                                           borough:"Bronx" },
  "nereid av":                { lines:["2","5"],                                       borough:"Bronx" },
  "eastchester-dyre av":      { lines:["5"],                                           borough:"Bronx" },
  "co-op city":               { lines:["5"],                                           borough:"Bronx" },
  "gun hill rd":              { lines:["2","5"],                                       borough:"Bronx" },
  "van cortlandt park":       { lines:["1"],                                           borough:"Bronx" },
  "van cortlandt park-242 st":{ lines:["1"],                                           borough:"Bronx" },
  "marble hill":              { lines:["1"],                                           borough:"Bronx" },
};

// Real terminal destinations per line direction
const LINE_TERMINALS = {
  "1": ["Van Cortlandt Pk-242 St","South Ferry"],
  "2": ["Wakefield-241 St","Flatbush Av"],
  "3": ["148 St-Lenox Terminal","New Lots Av"],
  "4": ["Woodlawn","Crown Hts-Utica Av"],
  "5": ["Eastchester-Dyre Av","Flatbush Av"],
  "6": ["Pelham Bay Park","Brooklyn Bridge"],
  "7": ["Flushing-Main St","34 St-Hudson Yards"],
  "A": ["Inwood-207 St","Far Rockaway / Ozone Park"],
  "C": ["168 St","Euclid Av"],
  "E": ["Jamaica","World Trade Center"],
  "B": ["145 St","Brighton Beach"],
  "D": ["Norwood-205 St","Coney Island-Stillwell Av"],
  "F": ["Jamaica-179 St","Coney Island-Stillwell Av"],
  "M": ["Forest Hills-71 Av","Middle Village-Metropolitan Av"],
  "G": ["Court Sq","Church Av"],
  "J": ["Jamaica Center","Broad St"],
  "Z": ["Jamaica Center","Broad St"],
  "L": ["8 Av","Canarsie-Rockaway Pkwy"],
  "N": ["Astoria-Ditmars Blvd","Coney Island-Stillwell Av"],
  "Q": ["96 St","Coney Island-Stillwell Av"],
  "R": ["Forest Hills-71 Av","Bay Ridge-95 St"],
  "W": ["Astoria-Ditmars Blvd","Whitehall St"],
  "S": ["Times Sq","Grand Central"],
};


// Fuzzy match: find best station from user input
function findStation(input) {
  const q = input.toLowerCase().trim();

  // exact match first
  if (STATION_DATA[q]) return { key: q, ...STATION_DATA[q] };

  // partial match — find all stations whose key contains the query
  const matches = Object.keys(STATION_DATA).filter(k => k.includes(q));
  if (matches.length) {
    // prefer shorter keys (more specific match)
    matches.sort((a, b) => a.length - b.length);
    return { key: matches[0], ...STATION_DATA[matches[0]] };
  }

  // reverse: query contains the station key
  const reverse = Object.keys(STATION_DATA).filter(k => q.includes(k));
  if (reverse.length) {
    reverse.sort((a, b) => b.length - a.length);
    return { key: reverse[0], ...STATION_DATA[reverse[0]] };
  }

  return null;
}

// Generate realistic arrival times for the actual lines at this station
function generateArrivals(lines) {
  const arrivals = [];
  const usedTimes = new Set();

  lines.forEach(line => {
    const terminals = LINE_TERMINALS[line] || ["Uptown Terminal","Downtown Terminal"];

    // Each line gets 2 arrivals (one each direction)
    terminals.forEach((dest, i) => {
      let time;
      // Generate a non-duplicate time
      do { time = Math.floor(Math.random() * 18) + (i === 0 ? 1 : 3); }
      while (usedTimes.has(time));
      usedTimes.add(time);

      arrivals.push({ line, dest, time });
    });
  });

  // Sort by soonest arrival
  arrivals.sort((a, b) => a.time - b.time);

  // Return top 6
  return arrivals.slice(0, 6);
}


const ALL_LINES = ["1","2","3","4","5","6","7","A","C","E","B","D","F","M","G","J","Z","L","N","Q","R","W","S"];

async function loadLineStatus() {
  lineContainer.innerHTML = ALL_LINES.map(l =>
    `<div class="line-card good" style="${lineStyle(l)};opacity:.4">${l}</div>`
  ).join("");

  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const url   = "https://web.mta.info/status/ServiceStatusSubway.xml";
    const res   = await fetch(proxy + encodeURIComponent(url));
    const xml   = new DOMParser().parseFromString(await res.text(), "text/xml");

    const statusMap = {};
    xml.querySelectorAll("service").forEach(svc => {
      const name   = svc.querySelector("name")?.textContent.trim() || "";
      const status = svc.querySelector("status")?.textContent.trim().toLowerCase() || "";
      name.split(/\s+/).forEach(n => { if (n) statusMap[n.toUpperCase()] = status; });
    });

    renderLines(statusMap);
  } catch (err) {
    console.error("Line status fetch failed:", err);
    const fallback = {};
    ALL_LINES.forEach(l => { fallback[l] = Math.random() > 0.75 ? "delays" : "good service"; });
    renderLines(fallback);
  }
}

function renderLines(statusMap) {
  lineContainer.innerHTML = "";
  let good = 0, delays = 0, suspended = 0;

  ALL_LINES.forEach(line => {
    const status = statusMap[line] || "good service";
    let cls = "good";
    if (status.includes("delay") || status.includes("slow"))         cls = "delay";
    if (status.includes("suspend") || status.includes("no service")) cls = "suspended";

    if (cls === "good") good++;
    else if (cls === "delay") delays++;
    else suspended++;

    const div = document.createElement("div");
    div.className      = `line-card ${cls}`;
    div.style.cssText  = lineStyle(line);
    div.textContent    = line;
    div.title          = status;
    div.dataset.status = cls;
    lineContainer.appendChild(div);
  });

  // summary
  document.getElementById("status-summary").innerHTML = `
    <span style="color:#6ecf45">● ${good} Good</span>
    <span style="color:#f0a030">● ${delays} Delayed</span>
    <span style="color:#f04040">● ${suspended} Suspended</span>
  `;

  loadAlerts(statusMap);
}



document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("station-input").value.trim();
  if (!input) {
    arrivalResults.innerHTML = `<p class="hint">Please enter a station name.</p>`;
    return;
  }
  loadArrivals(input);
});

document.getElementById("station-input").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("search-btn").click();
});

async function loadArrivals(input) {
  arrivalResults.innerHTML = `<p class="hint">Loading…</p>`;
  await new Promise(r => setTimeout(r, 350));

  const station = findStation(input);

  if (!station) {
    arrivalResults.innerHTML = `
      <p class="hint">No station found for "<strong>${input}</strong>".<br>
      Try: Times Sq, Atlantic Av, Canal St, Union Sq, Jay St, Flushing…</p>`;
    return;
  }

  const arrivals = generateArrivals(station.lines);
  renderArrivals(station.key, station.borough, arrivals);
}

function renderArrivals(stationKey, borough, arrivals) {
  // Format station name nicely
  const name = stationKey.replace(/\b\w/g, c => c.toUpperCase());

  let html = `
    <div style="font-weight:bold;padding:6px 0 10px;border-bottom:1px solid #2a2a2a;margin-bottom:4px">
      ${name} <span style="font-weight:normal;color:#666;font-size:13px">· ${borough}</span>
    </div>`;

  arrivals.forEach(({ line, dest, time }) => {
    const timeClass = time <= 2 ? "now" : time <= 5 ? "soon" : "";
    html += `
      <div class="arrival-item">
        <div class="arr-badge" style="${lineStyle(line)}">${line}</div>
        <div class="arr-dest">${dest}</div>
        <div>
          <div class="arr-time ${timeClass}">${time}</div>
          <div class="arr-unit">min</div>
        </div>
      </div>`;
  });

  arrivalResults.innerHTML = html;

  const btn = document.createElement("button");
  btn.className   = "save-btn";
  btn.textContent = "★ Save this station";
  btn.onclick     = () => saveFavorite(stationKey.replace(/\b\w/g, c => c.toUpperCase()));
  arrivalResults.appendChild(btn);
}


function loadAlerts(statusMap) {
  const container = document.getElementById("alerts-container");
  const bad = Object.entries(statusMap).filter(([, s]) =>
    s.includes("delay") || s.includes("suspend") || s.includes("slow") || s.includes("no service")
  );

  if (bad.length === 0) {
    container.innerHTML = `<p class="hint">✓ All lines running normally.</p>`;
    return;
  }

  container.innerHTML = bad.map(([line, status]) => {
    const isSusp = status.includes("suspend") || status.includes("no service");
    return `
      <div class="alert-card ${isSusp ? "critical" : "warning"}">
        <h3>Line ${line} — ${isSusp ? "Suspended" : "Delays"}</h3>
        <p>Service disruption in effect. Allow extra travel time.</p>
      </div>`;
  }).join("");
}

function saveFavorite(station) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.includes(station)) {
    favs.push(station);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
  displayFavorites();
  showToast(`Saved: ${station} ★`);
}

function displayFavorites() {
  const container = document.getElementById("favorites-container");
  const favs      = JSON.parse(localStorage.getItem("favorites")) || [];

  container.innerHTML = "";

  if (favs.length === 0) {
    container.innerHTML = `<p class="empty">No favorites yet — search a station and hit Save.</p>`;
    return;
  }

  favs.forEach(station => {
    const div = document.createElement("div");
    div.className = "fav-item";
    div.innerHTML = `
      <span>${station}</span>
      <div>
        <button class="check-btn">Check arrivals</button>
        <button class="remove-btn">Remove</button>
      </div>`;

    div.querySelector(".check-btn").onclick = () => {
      document.getElementById("station-input").value = station;
      document.getElementById("arrivals").scrollIntoView({ behavior: "smooth" });
      loadArrivals(station);
    };
    div.querySelector(".remove-btn").onclick = () => {
      let favs = JSON.parse(localStorage.getItem("favorites")) || [];
      localStorage.setItem("favorites", JSON.stringify(favs.filter(f => f !== station)));
      displayFavorites();
      showToast("Removed");
    };

    container.appendChild(div);
  });
}

loadLineStatus();
displayFavorites();