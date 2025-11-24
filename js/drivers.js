


function calculateTotal(points) {
  return (points || []).reduce((sum, p) => {
    if (p === "DNF" || p === null || p === undefined) return sum;
    return sum + (typeof p === "number" ? p : 0);
  }, 0);
}


function buildDriverStatsFromSeasons(seasons) {
  const driverMap = {};

  function ensureDriver(name) {
    if (!driverMap[name]) {
      driverMap[name] = {
        name,
        seasons: new Set(),      
        championships: 0,        
        raceWins: 0,             
        podiums: 0,              
        careerPoints: 0,         
        racesEntered: 0,         
        highestFinish: Infinity  
      };
    }
    return driverMap[name];
  }

  seasons.forEach((season, seasonIdx) => {
    const seasonNumber = seasonIdx + 1;

    
    const standingsWithTotal = season.standings.map((d) => ({
      ...d,
      total: calculateTotal(d.points)
    }));

    const sortedSeason = [...standingsWithTotal].sort(
      (a, b) => b.total - a.total
    );
    const championName = sortedSeason[0]?.driver || null;

    
    standingsWithTotal.forEach((entry) => {
      const stat = ensureDriver(entry.driver);
      stat.seasons.add(seasonNumber);
      if (entry.driver === championName) {
        stat.championships += 1;
      }
    });

    
    season.standings.forEach((entry) => {
      const stat = ensureDriver(entry.driver);
      (entry.points || []).forEach((p) => {
        if (p === null || p === undefined) return;
        stat.racesEntered += 1;          
        if (typeof p === "number") {
          stat.careerPoints += p;
        }
      });
    });

    
    const numRaces = (season.races || []).length;
    for (let raceIdx = 0; raceIdx < numRaces; raceIdx++) {
      const raceResults = season.standings
        .map((d) => ({
          name: d.driver,
          score: d.points && d.points[raceIdx]
        }))
        .filter((x) => typeof x.score === "number");

      if (!raceResults.length) continue;

      raceResults.sort((a, b) => b.score - a.score);

      raceResults.forEach((res, idx) => {
        const pos = idx + 1;
        const stat = ensureDriver(res.name);

        
        if (pos === 1) {
          stat.raceWins += 1;
        }
        
        if (pos <= 3) {
          stat.podiums += 1;
        }
        
        if (pos < stat.highestFinish) {
          stat.highestFinish = pos;
        }
      });
    }
  });

  
  return Object.values(driverMap)
    .map((stat) => ({
      name: stat.name,
      championships: stat.championships,
      raceWins: stat.raceWins,
      podiums: stat.podiums,
      careerPoints: stat.careerPoints,
      racesEntered: stat.racesEntered,
      seasonsEntered: stat.seasons.size,
      highestFinish:
        stat.highestFinish === Infinity ? "-" : stat.highestFinish
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

document.addEventListener("DOMContentLoaded", () => {
  
  if (typeof SEASONS === "undefined") {
    console.error("SEASONS 未定义，请确认已正确引入 seasons-data.js");
    return;
  }

  const drivers = buildDriverStatsFromSeasons(SEASONS);
  if (!drivers.length) return;

  
  const driverSelectBtn  = document.getElementById("driver-select-btn");
  const driverSelectText = document.getElementById("driver-select-text");
  const driverSelectMenu = document.getElementById("driver-select-menu");

  
  const nameEl            = document.getElementById("drivers-name");
  const statChampionships = document.getElementById("stat-championships");
  const statRaceWins      = document.getElementById("stat-race-wins");
  const statPodiums       = document.getElementById("stat-podiums");
  const statCareerPoints  = document.getElementById("stat-career-points");
  const statRacesEntered  = document.getElementById("stat-races-entered");
  const statSeasonsEntered= document.getElementById("stat-seasons-entered");
  const statBestFinish    = document.getElementById("stat-best-finish");

  const closeBtn          = document.getElementById("drivers-close");

  if (!driverSelectBtn || !driverSelectMenu || !driverSelectText) {
    console.error("Driver selector 元素没找到，检查 HTML 中的 id。");
    return;
  }

  let currentDriver = drivers[0];

  
  function renderDriver(driver) {
    nameEl.textContent            = driver.name.toUpperCase();
    statChampionships.textContent = driver.championships || 0;
    statRaceWins.textContent      = driver.raceWins || 0;
    statPodiums.textContent       = driver.podiums || 0;
    statCareerPoints.textContent  = driver.careerPoints || 0;
    statRacesEntered.textContent  = driver.racesEntered || 0;
    statSeasonsEntered.textContent= driver.seasonsEntered || 0;
    statBestFinish.textContent    =
      driver.highestFinish === "-" ? "-" : String(driver.highestFinish);
  }

  
  function renderDriverMenu() {
    driverSelectMenu.innerHTML = "";

    drivers.forEach((d) => {
      const item = document.createElement("div");
      item.className =
        "season-option" +
        (d.name === currentDriver.name ? " season-option--active" : "");

      const span = document.createElement("span");
      span.textContent = d.name.toUpperCase();
      item.appendChild(span);

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        currentDriver = d;
        driverSelectText.textContent = d.name.toUpperCase();
        renderDriver(currentDriver);

        
        driverSelectMenu
          .querySelectorAll(".season-option")
          .forEach((el) => el.classList.remove("season-option--active"));
        item.classList.add("season-option--active");

        driverSelectMenu.style.display = "none";
      });

      driverSelectMenu.appendChild(item);
    });
  }

  
  driverSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = driverSelectMenu.style.display === "block";
    driverSelectMenu.style.display = isOpen ? "none" : "block";
  });

  
  document.addEventListener("click", (e) => {
    if (
      !driverSelectBtn.contains(e.target) &&
      !driverSelectMenu.contains(e.target)
    ) {
      driverSelectMenu.style.display = "none";
    }
  });

  
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  
  currentDriver = drivers[0];
  driverSelectText.textContent = currentDriver.name.toUpperCase();
  renderDriver(currentDriver);
  renderDriverMenu();
});
