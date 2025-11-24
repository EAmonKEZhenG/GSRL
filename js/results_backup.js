// js/results.js

// Helper function to calculate total points (treats "DNF" as 0)
function calculateTotal(points) {
  return points.reduce((sum, p) => {
    if (p === "DNF" || p === null || p === undefined) return sum;
    return sum + (typeof p === "number" ? p : 0);
  }, 0);
}

// Helper function to find champion race index (highest score per race)
function findChampionRaceIndex(standings, raceIndex) {
  let maxScore = -1;
  let championIndex = -1;
  
  standings.forEach((driver, idx) => {
    const score = driver.points[raceIndex];
    if (score !== "DNF" && score !== null && score !== undefined && typeof score === "number") {
      if (score > maxScore) {
        maxScore = score;
        championIndex = idx;
      }
    }
  });
  
  return championIndex;
}

// ===== 赛季数据 =====
const seasons = [
  {
    id: "season1",
    label: "SEASON 1",
    seriesName: "PERFORMANCE SPORTS CAR CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" }, // Belgium flag placeholder
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Kevin", team: "Alfa Romeo", points: [21, 32, 21, 17, 17, 22] },
      { driver: "Robin", team: "Alfa Romeo", points: [29, 18, 32, 28, 25, 28] },
      { driver: "CZ", team: "BMW", points: [16, 20, 14, 25, 28, 20] },
      { driver: "Makka", team: "BMW", points: [14, 13, 16, 13, 13, 13] }
    ],
    gallery: [
      "./assets/images/season_images/S1/S1R2_Start.png"
    ]
  },
  {
    id: "season2",
    label: "SEASON 2",
    seriesName: "TOURING CAR CUP I",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" } // Belgium flag placeholder
    ],
    standings: [
      { driver: "CZ", team: "MG", points: [22, 27, 18] },
      { driver: "Kevin", team: "MG", points: [18, 19, 22] },
      { driver: "Makka", team: "Lynk & Co", points: [14, 14, 14] },
      { driver: "Robin", team: "Lynk & Co", points: [29, 23, 29] }
    ],
    gallery: [
      "./assets/images/season_images/S2/S2R2_Start.png"
    ]
  },
  {
    id: "season3",
    label: "SEASON 3",
    seriesName: "TOURING CAR CUP II",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" }, // Belgium flag placeholder
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Joseph", team: "Hyundai", points: [14, 14, 16, 14, 26, 14] },
      { driver: "Robin", team: "Hyundai", points: [23, 27, 29, 29, 18, 28] },
      { driver: "CZ", team: "Audi", points: [25, 23, 20, 18, 14, 18] },
      { driver: "Kevin", team: "Audi", points: [19, 19, 18, 22, 25, 23] }
    ],
    gallery: [
      "./assets/images/season_images/S3/S3R1_Start.png",
      "./assets/images/season_images/S3/S3R2_Start.png",
      "./assets/images/season_images/S3/S3R2_KevinVRobin.png"
    ]
  },
  {
    id: "season4",
    label: "SEASON 4",
    seriesName: "VINTAGE MODIFIED CUP",
    races: [
      { name: "Mid-Ohio", flag: "./assets/images/flag/united-states.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "New Hampshire Motor Speedway", flag: "./assets/images/flag/united-states.png" },
      { name: "Virginia International Raceway", flag: "./assets/images/flag/united-states.png" }
    ],
    standings: [
      { driver: "CZ", team: "Toyota", points: [23, 27, 24, 28] },
      { driver: "Robin", team: "Toyota", points: [25, 22, 20, 20] },
      { driver: "Joseph", team: "Lotus", points: [14, 19, 22, 18] },
      { driver: "Kevin", team: "Lotus", points: [21, 15, 17, 17] },
      { driver: "Bryan", team: "Mazda", points: ["DNF", "DNF", "DNF", "DNF"] }
    ],
    gallery: [
      "./assets/images/season_images/S4/S4R1_Start.png",
      "./assets/images/season_images/S4/S4R2_Rain_film.jpg"
    ]
  },
  {
    id: "season5",
    label: "SEASON 5",
    seriesName: "KTM SPEC SPRINT CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Robin", team: "KTM", points: [27, 24, 24, 23, 24, 29] },
      { driver: "Joseph", team: "KTM", points: [20, 18, 25, 14, 27, 20] },
      { driver: "Kevin", team: "KTM", points: [22, 27, 20, 18, 17, 15] },
      { driver: "Bryan", team: "KTM", points: [14, 14, 14, 28, 16, 19] }
    ],
    gallery: [
      "./assets/images/season_images/S5/S5R4_Start.png",
      "./assets/images/season_images/S5/S5R5_Start.png"
    ]
  },
  {
    id: "season6",
    label: "SEASON 6",
    seriesName: "GT3 CHAMPIONSHIP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Spa-Francorchamps", flag: "./assets/images/flag/united-kingdom.png" }, // Belgium flag placeholder
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Bryan", team: "Aston Martin", points: [20, 26, 28, null, null, null] },
      { driver: "Robin", team: "Cadillac", points: [27, 17, 23, null, null, null] },
      { driver: "Kevin", team: "Acura", points: [20, 23, 16, null, null, null] },
      { driver: "Joseph", team: "AMG", points: [16, 15, 14, null, null, null] },
      { driver: "CZ", team: "Audi", points: [11, 13, 2, null, null, null] },
      { driver: "Daniel", team: "Ferrari", points: ["DNF", "DNF", "DNF", null, null, null] },
      { driver: "Billy", team: "Lexus", points: ["DNF", "DNF", "DNF", null, null, null] } // Practice debut
    ],
    gallery: [
      "./assets/images/season_images/S6/S6R1_Start.png",
      "./assets/images/season_images/S6/S6R2_CloseFinish.png",
      "./assets/images/season_images/S6/S6R2_No2to5.png"
    ]
  },
  {
    id: "season7",
    label: "SEASON 7",
    seriesName: "RENAULT CLIO CUP",
    races: [
      { name: "Silverstone", flag: "./assets/images/flag/united-kingdom.png" },
      { name: "Hakone", flag: "./assets/images/flag/japan.png" },
      { name: "Laguna Seca", flag: "./assets/images/flag/united-states.png" },
      { name: "Hockenheim", flag: "./assets/images/flag/germany.png" },
      { name: "Watkins Glen", flag: "./assets/images/flag/united-states.png" },
      { name: "Yas Marina", flag: "./assets/images/flag/united-arab-emirates.png" }
    ],
    standings: [
      { driver: "Bryan", team: "Renault", points: [29, 28, 20, null, null, null] },
      { driver: "Robin", team: "Renault", points: [22, 23, 28, null, null, null] },
      { driver: "Joseph", team: "Renault", points: [18, 18, 15, null, null, null] },
      { driver: "CZ", team: "Renault", points: [14, 14, 20, null, null, null] },
      { driver: "Nanako", team: "Renault", points: ["DNF", "DNF", 11, null, null, null] },
      { driver: "Makka", team: "Renault", points: ["DNF", 11, "DNF", null, null, null] }
    ],
    gallery: [] // S7 directory is empty
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("results-back");
  const closeBtn = document.getElementById("results-close");
  const seasonSelectBtn = document.getElementById("season-select-btn");
  const seasonSelectText = document.getElementById("season-select-text");
  const seasonSelectMenu = document.getElementById("season-select-menu");
  const seriesNameEl = document.getElementById("series-name");
  const tbody = document.getElementById("results-tbody");
  const galleryEl = document.getElementById("results-gallery");
  const modal = document.getElementById("results-modal");
  const modalImg = document.getElementById("results-modal-img");
  const modalClose = document.getElementById("results-modal-close");

  // 返回首页
  backBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // 关闭按钮返回首页
  closeBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Season 下拉菜单
  seasonSelectBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seasonSelectMenu.style.display !== "none";
    seasonSelectMenu.style.display = isOpen ? "none" : "block";
    seasonSelectBtn.classList.toggle("active", !isOpen);
  });

  // 点击外部关闭菜单
  document.addEventListener("click", (e) => {
    if (!seasonSelectBtn.contains(e.target) && !seasonSelectMenu.contains(e.target)) {
      seasonSelectMenu.style.display = "none";
      seasonSelectBtn.classList.remove("active");
    }
  });

  // 填充 season 菜单
  // ===== 填充 season 下拉菜单（和 highlights 同逻辑） =====
  function buildSeasonMenu() {
    seasonSelectMenu.innerHTML = "";

    seasons.forEach((s, idx) => {
      const item = document.createElement("div");
      item.className = "season-option";

      // 默认第一个高亮
      if (idx === 0) {
        item.classList.add("season-option--active");
      }

      // 用 span 来承载文字，好做 skewX(20deg)
      const label = document.createElement("span");
      label.textContent = s.label;    // 这里直接用数据里的 label
      item.appendChild(label);

      item.addEventListener("click", (e) => {
        e.stopPropagation();

        // 先清除所有 active
        seasonSelectMenu
          .querySelectorAll(".season-option")
          .forEach((el) => el.classList.remove("season-option--active"));

        // 当前这个设为 active
        item.classList.add("season-option--active");

        // 按钮文字同步
        seasonSelectText.textContent = s.label;

        // 重新渲染赛季
        renderSeason(s.id);

        // 收起菜单
        seasonSelectMenu.style.display = "none";
        seasonSelectBtn.classList.remove("active");
      });

      seasonSelectMenu.appendChild(item);
    });
  }

  // 初始化菜单
  buildSeasonMenu();


  // 设置初始文本
  if (seasons.length > 0) {
    seasonSelectText.textContent = seasons[0].label;
  }

  function renderSeason(seasonId) {
    const season = seasons.find((s) => s.id === seasonId);
    if (!season) return;

    // 系列名称
    seriesNameEl.textContent = season.seriesName;

    // 表头：POSITION / DRIVER / SCORE + 每轮国旗
    const table = document.querySelector(".results-table");
    const theadRow = table.querySelector("thead tr");

    // 先清掉之前的"比赛列"
    while (theadRow.children.length > 3) {
      theadRow.removeChild(theadRow.lastElementChild);
    }

    // 添加国旗列
    season.races.forEach((race) => {
      const th = document.createElement("th");
      th.className = "results-table__th results-table__th--race";
      
      const flagWrapper = document.createElement("div");
      flagWrapper.className = "results-table__th-flag";
      
      const flagImg = document.createElement("img");
      flagImg.src = race.flag;
      flagImg.alt = race.name;
      
      const tooltip = document.createElement("div");
      tooltip.className = "results-table__th-flag-tooltip";
      tooltip.textContent = race.name;
      
      flagWrapper.appendChild(flagImg);
      flagWrapper.appendChild(tooltip);
      th.appendChild(flagWrapper);
      theadRow.appendChild(th);
    });

    // 计算总分并按总分排序（大到小），处理DNF和null值
    const standingsWithTotals = season.standings.map((d) => ({
      ...d,
      total: calculateTotal(d.points)
    }));

    const sorted = standingsWithTotals
      .sort((a, b) => b.total - a.total)
      .map((d, idx) => ({ ...d, position: idx + 1 }));

    // 找出每场比赛的冠军（最高分），记录冠军的driver+team组合
    const raceChampions = [];
    for (let raceIdx = 0; raceIdx < season.races.length; raceIdx++) {
      let maxScore = -1;
      let raceChampion = null;
      
      standingsWithTotals.forEach((driver) => {
        const score = driver.points[raceIdx];
        if (score !== "DNF" && score !== null && score !== undefined && typeof score === "number") {
          if (score > maxScore) {
            maxScore = score;
            raceChampion = { driver: driver.driver, team: driver.team };
          }
        }
      });
      
      raceChampions.push(raceChampion);
    }

    // 找出总冠军（position 1）
    const overallChampion = sorted.find(d => d.position === 1);

    // 渲染 tbody
    tbody.innerHTML = "";
    sorted.forEach((row) => {
      const tr = document.createElement("tr");

      // POSITION - 根据排名设置颜色
      const tdPos = document.createElement("td");
      tdPos.className = "results-table__pos";
      let posClass = "results-table__pos--default";
      if (row.position === 1) {
        posClass = "results-table__pos--gold";
      } else if (row.position === 2) {
        posClass = "results-table__pos--silver";
      } else if (row.position === 3) {
        posClass = "results-table__pos--bronze";
      }
      tdPos.classList.add(posClass);
      tdPos.textContent = row.position + ".";
      tr.appendChild(tdPos);

      // DRIVER + TEAM
      const tdDriver = document.createElement("td");
      const nameEl = document.createElement("div");
      nameEl.className = "results-table__driver-name";
      nameEl.textContent = row.driver;

      const teamEl = document.createElement("div");
      teamEl.className = "results-table__team";
      teamEl.textContent = row.team || "";

      tdDriver.appendChild(nameEl);
      if (row.team) {
        tdDriver.appendChild(teamEl);
      }
      tr.appendChild(tdDriver);

      // TOTAL SCORE
      const tdTotal = document.createElement("td");
      tdTotal.className = "results-table__total";
      tdTotal.textContent = row.total;
      tr.appendChild(tdTotal);

      // 每场得分 - 处理DNF、null值，并高亮总冠军的冠军赛
      row.points.forEach((p, raceIdx) => {
        const td = document.createElement("td");
        td.className = "results-table__race";
        
        // 如果是总冠军（position 1）且这是他的冠军赛，添加高亮
        if (row.position === 1 && overallChampion && raceChampions[raceIdx]) {
          const isChampionRace = raceChampions[raceIdx].driver === overallChampion.driver &&
                                  raceChampions[raceIdx].team === overallChampion.team;
          if (isChampionRace) {
            td.classList.add("results-table__race--highlight");
          }
        }
        
        // 处理DNF、null和空值
        if (p === "DNF") {
          td.textContent = "DNF";
          td.classList.add("results-table__race--dnf");
        } else if (p === null || p === undefined) {
          td.textContent = ""; // 空单元格
        } else {
          td.textContent = p;
        }
        
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    // 渲染底部 gallery
    galleryEl.innerHTML = "";
    if (season.gallery && season.gallery.length > 0) {
      season.gallery.forEach((src) => {
        const fig = document.createElement("figure");
        fig.className = "results-gallery__item";

        const img = document.createElement("img");
        img.className = "results-gallery__img";
        img.src = src;
        img.alt = season.seriesName;

        // 点击图片放大
        fig.addEventListener("click", () => {
          modalImg.src = src;
          modal.style.display = "flex";
        });

        fig.appendChild(img);
        galleryEl.appendChild(fig);
      });
    }
  }

  // 关闭模态框
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // 初始化默认赛季
  if (seasons.length > 0) {
    renderSeason(seasons[0].id);
  }

  function syncSeasonButtonHeight() {
  const resultsTitle = document.querySelector(".results-header__title");
  const seasonBtn = document.querySelector(".results-header__season-btn");

  if (resultsTitle && seasonBtn) {
    const titleHeight = resultsTitle.offsetHeight;
    seasonBtn.style.height = `${titleHeight * 0.5}px`;
    }
  }

  window.addEventListener("resize", syncSeasonButtonHeight);
  syncSeasonButtonHeight();





  function syncSeasonButtonSize() {
  const resultsTitle = document.querySelector(".results-header__title");
  const seasonBtn = document.querySelector(".results-header__season-btn");

  if (resultsTitle && seasonBtn) {
    const titleHeight = resultsTitle.offsetHeight;
    const btnHeight = titleHeight * 0.5;
    const btnWidth = btnHeight * 2.2; // 调整这个比例实现你想要的视觉宽度

    seasonBtn.style.height = `${btnHeight}px`;
    seasonBtn.style.width = `${btnWidth}px`;
    }
  }

  window.addEventListener("resize", syncSeasonButtonSize);
  syncSeasonButtonSize();
});
