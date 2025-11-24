// js/drivers.js

// 和 results 一样的计分规则：DNF / null / undefined 都当 0 分
function calculateTotal(points) {
  return (points || []).reduce((sum, p) => {
    if (p === "DNF" || p === null || p === undefined) return sum;
    return sum + (typeof p === "number" ? p : 0);
  }, 0);
}

// 从全局 SEASONS 统计出每个车手的生涯数据
function buildDriverStatsFromSeasons(seasons) {
  const driverMap = {};

  function ensureDriver(name) {
    if (!driverMap[name]) {
      driverMap[name] = {
        name,
        seasons: new Set(),      // 参加过的赛季集合
        championships: 0,        // 赛季总冠军次数
        raceWins: 0,             // 分站冠军次数
        podiums: 0,              // 分站领奖台次数（前三）
        careerPoints: 0,         // 生涯总积分
        racesEntered: 0,         // 出场场次（DNF 也算出场）
        highestFinish: Infinity  // 最好完赛名次（数值越小越好）
      };
    }
    return driverMap[name];
  }

  seasons.forEach((season, seasonIdx) => {
    const seasonNumber = seasonIdx + 1;

    // 1. 先算本赛季总分，找出赛季冠军
    const standingsWithTotal = season.standings.map((d) => ({
      ...d,
      total: calculateTotal(d.points)
    }));

    const sortedSeason = [...standingsWithTotal].sort(
      (a, b) => b.total - a.total
    );
    const championName = sortedSeason[0]?.driver || null;

    // 2. 更新冠军次数 + 参加赛季
    standingsWithTotal.forEach((entry) => {
      const stat = ensureDriver(entry.driver);
      stat.seasons.add(seasonNumber);
      if (entry.driver === championName) {
        stat.championships += 1;
      }
    });

    // 3. 累加出场次数 & 生涯总积分
    season.standings.forEach((entry) => {
      const stat = ensureDriver(entry.driver);
      (entry.points || []).forEach((p) => {
        if (p === null || p === undefined) return;
        stat.racesEntered += 1;          // DNF 也算出场
        if (typeof p === "number") {
          stat.careerPoints += p;
        }
      });
    });

    // 4. 每场比赛按积分排名，算分站冠军 / 领奖台 / 最好名次
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

        // 分站冠军
        if (pos === 1) {
          stat.raceWins += 1;
        }
        // 领奖台
        if (pos <= 3) {
          stat.podiums += 1;
        }
        // 最好完赛名次
        if (pos < stat.highestFinish) {
          stat.highestFinish = pos;
        }
      });
    }
  });

  // 收尾：把 Map 变成数组，并算出 “SEASONS ENTERED = 参加过几个赛季”
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
  // 一定要先在 seasons-data.js 里定义好全局 SEASONS
  if (typeof SEASONS === "undefined") {
    console.error("SEASONS 未定义，请确认已正确引入 seasons-data.js");
    return;
  }

  const drivers = buildDriverStatsFromSeasons(SEASONS);
  if (!drivers.length) return;

  // ===== 顶部下拉相关 DOM =====
  const driverSelectBtn  = document.getElementById("driver-select-btn");
  const driverSelectText = document.getElementById("driver-select-text");
  const driverSelectMenu = document.getElementById("driver-select-menu");

  // ===== 统计数值 DOM =====
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

  // 把一个车手的数据填到页面上
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

  // 生成下拉菜单
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

        // 更新高亮
        driverSelectMenu
          .querySelectorAll(".season-option")
          .forEach((el) => el.classList.remove("season-option--active"));
        item.classList.add("season-option--active");

        driverSelectMenu.style.display = "none";
      });

      driverSelectMenu.appendChild(item);
    });
  }

  // ===== 菜单按钮交互 =====
  driverSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = driverSelectMenu.style.display === "block";
    driverSelectMenu.style.display = isOpen ? "none" : "block";
  });

  // 点击空白处关闭菜单
  document.addEventListener("click", (e) => {
    if (
      !driverSelectBtn.contains(e.target) &&
      !driverSelectMenu.contains(e.target)
    ) {
      driverSelectMenu.style.display = "none";
    }
  });

  // 右侧 X 返回首页
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  // ===== 初始化 =====
  currentDriver = drivers[0];
  driverSelectText.textContent = currentDriver.name.toUpperCase();
  renderDriver(currentDriver);
  renderDriverMenu();
});
