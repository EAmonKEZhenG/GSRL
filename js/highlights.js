function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return v;
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
  } catch (e) {
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
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

  const firstSeason = HIGHLIGHTS_SEASONS[0];
  let currentSeason = firstSeason ? firstSeason.season : 1;

  function renderSeasonMenu() {
    seasonMenu.innerHTML = "";

    HIGHLIGHTS_SEASONS.forEach((s) => {
      const item = document.createElement("div");
      item.className =
        "season-option" +
        (s.season === currentSeason ? " season-option--active" : "");
      item.textContent = `SEASON ${s.season}`;

      item.addEventListener("click", (ev) => {
        ev.stopPropagation();

        currentSeason = s.season;
        seasonText.textContent = `SEASON ${s.season}`;
        renderSeason(currentSeason);

        renderSeasonMenu();
        seasonMenu.style.display = "none";
      });

      seasonMenu.appendChild(item);
    });
  }

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

      link.addEventListener("click", (ev) => {
        ev.preventDefault();

        if (!id) {
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

  seasonBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = seasonMenu.style.display === "block";
    seasonMenu.style.display = isOpen ? "none" : "block";
  });

  document.addEventListener("click", () => {
    seasonMenu.style.display = "none";
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  function closeModal() {
    modal.style.display = "none";
    modalIframe.src = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  seasonText.textContent = `SEASON ${currentSeason}`;
  renderSeasonMenu();
  renderSeason(currentSeason);
});
