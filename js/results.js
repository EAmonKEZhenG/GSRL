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
    if (
      score !== "DNF" &&
      score !== null &&
      score !== undefined &&
      typeof score === "number"
    ) {
      if (score > maxScore) {
        maxScore = score;
        championIndex = idx;
      }
    }
  });

  return championIndex;
}

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

  if (typeof SEASONS === "undefined") {
    console.error("SEASONS 未定义，请确认已引入 seasons-data.js");
    return;
  }

  // ===== 导航 & 关闭 =====

  // 返回首页
  backBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // 右侧 X 关闭按钮返回首页
  closeBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // ===== Season 下拉按钮交互 =====

  // 点击按钮展开/收起菜单
  seasonSelectBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seasonSelectMenu.style.display === "block";
    seasonSelectMenu.style.display = isOpen ? "none" : "block";
    seasonSelectBtn.classList.toggle("active", !isOpen);
  });

  // 点击外部关闭菜单
  document.addEventListener("click", (e) => {
    if (
      !seasonSelectBtn.contains(e.target) &&
      !seasonSelectMenu.contains(e.target)
    ) {
      seasonSelectMenu.style.display = "none";
      seasonSelectBtn.classList.remove("active");
    }
  });

  // ===== 填充 season 下拉菜单 =====
  function buildSeasonMenu() {
    seasonSelectMenu.innerHTML = "";

    SEASONS.forEach((s, idx) => {
      const item = document.createElement("div");
      item.className = "season-option";

      if (idx === 0) {
        item.classList.add("season-option--active");
      }

      const label = document.createElement("span");
      label.textContent = s.label;
      item.appendChild(label);

      item.addEventListener("click", (e) => {
        e.stopPropagation();

        seasonSelectMenu
          .querySelectorAll(".season-option")
          .forEach((el) => el.classList.remove("season-option--active"));

        item.classList.add("season-option--active");

        seasonSelectText.textContent = s.label;

        renderSeason(s.id);

        seasonSelectMenu.style.display = "none";
        seasonSelectBtn.classList.remove("active");
      });

      seasonSelectMenu.appendChild(item);
    });
  }

  buildSeasonMenu();

  if (SEASONS.length > 0) {
    seasonSelectText.textContent = SEASONS[0].label;
  }

  // ===== 渲染某个赛季 =====
  function renderSeason(seasonId) {
    const season = SEASONS.find((s) => s.id === seasonId);
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

    // 计算总分并排序
    const standingsWithTotals = season.standings.map((d) => ({
      ...d,
      total: calculateTotal(d.points),
    }));

    const sorted = standingsWithTotals
      .sort((a, b) => b.total - a.total)
      .map((d, idx) => ({ ...d, position: idx + 1 }));

    // 找出每场比赛的冠军（最高分）
    const raceChampions = [];
    for (let raceIdx = 0; raceIdx < season.races.length; raceIdx++) {
      let maxScore = -1;
      let raceChampion = null;

      standingsWithTotals.forEach((driver) => {
        const score = driver.points[raceIdx];
        if (
          score !== "DNF" &&
          score !== null &&
          score !== undefined &&
          typeof score === "number"
        ) {
          if (score > maxScore) {
            maxScore = score;
            raceChampion = { driver: driver.driver, team: driver.team };
          }
        }
      });

      raceChampions.push(raceChampion);
    }

    const overallChampion = sorted.find((d) => d.position === 1);

    // 渲染 tbody
    tbody.innerHTML = "";
    sorted.forEach((row) => {
      const tr = document.createElement("tr");

      // POSITION
      const tdPos = document.createElement("td");
      tdPos.className = "results-table__pos";
      let posClass = "results-table__pos--default";
      if (row.position === 1) posClass = "results-table__pos--gold";
      else if (row.position === 2) posClass = "results-table__pos--silver";
      else if (row.position === 3) posClass = "results-table__pos--bronze";
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

      // 每场得分
      row.points.forEach((p, raceIdx) => {
        const td = document.createElement("td");
        td.className = "results-table__race";

        // 高亮总冠军的夺冠场次
        if (row.position === 1 && overallChampion && raceChampions[raceIdx]) {
          const isChampionRace =
            raceChampions[raceIdx].driver === overallChampion.driver &&
            raceChampions[raceIdx].team === overallChampion.team;
          if (isChampionRace) {
            td.classList.add("results-table__race--highlight");
          }
        }

        if (p === "DNF") {
          td.textContent = "DNF";
          td.classList.add("results-table__race--dnf");
        } else if (p === null || p === undefined) {
          td.textContent = "";
        } else {
          td.textContent = p;
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    // 底部 gallery
    galleryEl.innerHTML = "";
    if (season.gallery && season.gallery.length > 0) {
      season.gallery.forEach((src) => {
        const fig = document.createElement("figure");
        fig.className = "results-gallery__item";

        const img = document.createElement("img");
        img.className = "results-gallery__img";
        img.src = src;
        img.alt = season.seriesName;

        fig.addEventListener("click", () => {
          modalImg.src = src;
          modal.style.display = "flex";
        });

        fig.appendChild(img);
        galleryEl.appendChild(fig);
      });
    }
  }

  // ===== Modal 关闭 =====
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ===== 初始化默认赛季 =====
  if (SEASONS.length > 0) {
    renderSeason(SEASONS[0].id);
  }

  // ===== 同步 Season 按钮大小（可选） =====
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
      const btnWidth = btnHeight * 2.2;

      seasonBtn.style.height = `${btnHeight}px`;
      seasonBtn.style.width = `${btnWidth}px`;
    }
  }

  window.addEventListener("resize", syncSeasonButtonSize);
  syncSeasonButtonSize();
});
