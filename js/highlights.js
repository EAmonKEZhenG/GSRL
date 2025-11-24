// js/highlights.js

// 从 YouTube URL 里提取 video id
function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return v;
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
  } catch (e) {
    // 解析失败就算了，后面会兜底直接打开原链接
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  // 确保数据文件已经加载成功
  if (typeof HIGHLIGHTS_SEASONS === "undefined") {
    console.error("HIGHLIGHTS_SEASONS 未定义，请确认已正确引入 highlights-data.js");
    return;
  }

  const seasonBtn = document.getElementById("highlights-season-btn");
  const seasonText = document.getElementById("highlights-season-text");
  const seasonMenu = document.getElementById("highlights-season-menu");
  const grid = document.getElementById("highlights-grid");

  const closeBtn = document.getElementById("highlights-close");
  const modal = document.getElementById("highlights-modal");
  const modalIframe = document.getElementById("highlights-modal-iframe");
  const modalClose = document.getElementById("highlights-modal-close");

  // 默认选第一个存在的赛季
  const firstSeason = HIGHLIGHTS_SEASONS[0];
  let currentSeason = firstSeason ? firstSeason.season : 1;

  /* ========== 渲染 Season 下拉菜单 ========== */
  function renderSeasonMenu() {
    seasonMenu.innerHTML = "";

    HIGHLIGHTS_SEASONS.forEach((s) => {
      const item = document.createElement("div");
      item.className =
        "season-option" +
        (s.season === currentSeason ? " season-option--active" : "");
      item.textContent = `SEASON ${s.season}`;

      item.addEventListener("click", (ev) => {
        ev.stopPropagation(); // 避免触发 document 的 click 事件

        currentSeason = s.season;
        seasonText.textContent = `SEASON ${s.season}`;
        renderSeason(currentSeason); // 重新渲染卡片

        renderSeasonMenu(); // 让 active 状态更新
        seasonMenu.style.display = "none";
      });

      seasonMenu.appendChild(item);
    });
  }

  /* ========== 渲染某个赛季的所有 Highlight 卡片 ========== */
  function renderSeason(seasonNumber) {
    const seasonObj = HIGHLIGHTS_SEASONS.find(
      (s) => s.season === seasonNumber
    );

    grid.innerHTML = "";

    if (!seasonObj || !seasonObj.races || seasonObj.races.length === 0) {
      const empty = document.createElement("p");
      empty.className = "highlights-empty";
      empty.textContent = "NO HIGHLIGHTS FOR THIS SEASON";
      grid.appendChild(empty);
      return;
    }

    seasonObj.races.forEach((race) => {
      const card = document.createElement("article");
      card.className = "highlights-card";

      const title = document.createElement("h3");
      title.className = "highlights-card__title";
      title.textContent = `RACE #${race.race}`;

      const link = document.createElement("a");
      link.className = "highlights-card__thumb-link";
      link.href = race.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.className = "highlights-card__thumb";

      const id = extractYouTubeId(race.url);
      if (id) {
        img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
      img.alt = `Season ${seasonObj.season} - Race ${race.race} highlights`;

      link.appendChild(img);

      // 点击缩略图：用模态框播放，而不是直接跳 YouTube
      link.addEventListener("click", (ev) => {
        ev.preventDefault();

        if (!id) {
          // 解析不到 id 就直接开原链接
          window.open(race.url, "_blank", "noopener");
          return;
        }

        modal.style.display = "flex";
        modalIframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      });

      card.appendChild(title);
      card.appendChild(link);
      grid.appendChild(card);
    });
  }

  /* ========== Season 按钮交互 ========== */
  seasonBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seasonMenu.style.display === "block";
    seasonMenu.style.display = isOpen ? "none" : "block";
  });

  // 点页面空白处收起菜单
  document.addEventListener("click", () => {
    seasonMenu.style.display = "none";
  });

  /* ========== 右侧 X：返回首页 ========== */
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  /* ========== 模态框关闭 ========== */
  function closeModal() {
    modal.style.display = "none";
    modalIframe.src = ""; // 停止播放
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  /* ========== 初始化 ========== */
  seasonText.textContent = `SEASON ${currentSeason}`;
  renderSeasonMenu();
  renderSeason(currentSeason);
});
